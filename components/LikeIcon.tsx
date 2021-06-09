import ColoredHeart from '../public/static/images/ColoredHeart.svg';
import UnColoredHeart from '../public/static/images/UnColoredHeart.svg';

interface IProps {
  currentUserLikeId: number | null;
  onClickColoredHeart: (...any: any) => any;
  onClickUnCOloredHeart: (...any: any) => any;
}

const LikeIcon: React.FC<IProps> = ({
  currentUserLikeId,
  onClickColoredHeart,
  onClickUnCOloredHeart,
}) => {
  return (
    <>
    {
      currentUserLikeId ?
      <ColoredHeart onClick={onClickColoredHeart}/> :
      <UnColoredHeart onClick={onClickUnCOloredHeart}/>
    }
    </>
  );
};

export default LikeIcon;
