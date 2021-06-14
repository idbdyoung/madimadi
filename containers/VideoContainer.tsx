import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import VideoItem from '../components/Video/VideoItem';
import { getVideos } from '../lib/api/video';
import { VideoType } from '../types/video';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: white;
`;

interface ScrollContainerType {
  height: number;
}

const ScrollContainer = styled.div.attrs<ScrollContainerType>((props) => ({
  style: {
    height: props.height,
  },
}))<ScrollContainerType>`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 1600px;
  overflow-y: scroll;
`;

interface IProps {
  videoList: VideoType[];
}

const VideoContainer: React.FC<IProps> = ({ videoList }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoItemRef = useRef<any[]>([]);
  const [scrollContainerHeight, setScrollContainerHeight] = useState(0);
  const [videos, setVideos] = useState(videoList);
  const [fetch, setFetch] = useState(false);
  const [queryIndex, setQueryIndex] = useState(10);

  const onIntersectVideoItem: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      if (entry.target === videoItemRef.current[videoItemRef.current.length - 1]) {
        setFetch(true);
      }
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      setScrollContainerHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef.current]);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersectVideoItem, { threshold: 0.5 });

    for (let i = 0; i < videoItemRef.current.length; i++) {
      observer.observe(videoItemRef.current[i]);
    }
  }, [fetch]);

  useEffect(() => {
    if (!fetch) return;

    (async function () {
      try {
        const { data } = await getVideos(queryIndex);
        setVideos([...videos, ...data]);

        if (data.length) {
          setQueryIndex(queryIndex + 10);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFetch(false);
      }
    })();
  }, [fetch]);

  return (
    <Container ref={containerRef}>
      <ScrollContainer height={scrollContainerHeight}>
        {
          videos.map((video, i) => {
            return (
              <div
                key={video.id}
                ref={(el) => videoItemRef.current[i] = el}
              >
                <VideoItem data={video}/>
              </div>
            );
          })
        }
      </ScrollContainer>
    </Container>
  );
};

export default VideoContainer;
