import ColoredHeart from '../public/static/images/ColoredHeart.svg';
import UnColoredHeart from '../public/static/images/UnColoredHeart.svg';

interface IProps {
  isClicked: boolean;
  onClickColoredHeart: (...any: any) => any;
  onClickUnCOloredHeart: (...any: any) => any;
}

const LikeIcon: React.FC<IProps> = ({
  isClicked,
  onClickColoredHeart,
  onClickUnCOloredHeart,
}) => {
  return (
    <>
    {
      isClicked ?
      <ColoredHeart onClick={onClickColoredHeart}/> :
      <UnColoredHeart onClick={onClickUnCOloredHeart}/>
    }
    </>
  );
};

export default LikeIcon;
