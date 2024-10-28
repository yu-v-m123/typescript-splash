import React from 'react';
import ImageModal from './ImageModal';

export type ImageCardProps = {
  id: number;
  description: string;
  urls: { regular: string };
};

type Props = {
  image: ImageCardProps;
};

const ImageCard: React.FC<Props> = (props) => {
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  const [spans, setSpans] = React.useState<number>(0);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const calculateSpans = () => {
    if (imageRef.current !== null) {
      const height = imageRef.current.clientHeight;
      setSpans(Math.ceil(height / 10));
    }
  };

  React.useEffect(() => {
    if (imageRef.current !== null) {
      imageRef.current.addEventListener('load', calculateSpans);
    }
  });

  const { description, urls } = props.image;

  return (
    <>
      <div style={{ gridRowEnd: `span ${spans}` }}>
        <img onClick={() => setModalShow(true)} ref={imageRef} alt={description} src={urls.regular} />
      </div>
      <ImageModal
        image={props.image}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default ImageCard;
