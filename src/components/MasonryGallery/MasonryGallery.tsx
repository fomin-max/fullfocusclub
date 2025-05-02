import { useEffect, useState } from 'react';
import {
  motion,
  useAnimation,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Masonry from 'react-masonry-css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Skeleton from 'react-loading-skeleton'; // Плейсхолдер

// Импорт картинок локально
import image1 from './assets/electra-max-min.webp';
import image2 from './assets/arena-min.webp';
import image3 from './assets/electra-max-2-min.webp';
import image4 from './assets/komenda-pro-min.webp';
import image5 from './assets/prosvet-pro-min.webp'; // Возвращаем обратно
import image6 from './assets/vo-pro-2-min.webp';
import image7 from './assets/vo-pro-min.webp';
import image8 from './assets/vo-ps-min.webp';
import image9 from './assets/prosvet-admin-min.webp';

const images: string[] = [
  image1,
  image5,
  image9,
  image7,
  image2,
  image3,
  image4,
  image6,
  image8,
];

interface AnimatedImageProps {
  src: string;
  index: number;
  onClick: (index: number) => void;
}

const AnimatedImage = ({ src, index, onClick }: AnimatedImageProps) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const { scrollY } = useScroll();
  const springY = useSpring(scrollY, { stiffness: 60, damping: 20 });
  const y = useTransform(
    springY,
    (value) => (value / 20) * (index % 2 === 0 ? 1 : -1)
  ); // разные направления

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { delay: index * 0.05, duration: 0.7, ease: 'easeOut' },
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      style={{
        marginBottom: '20px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#f5f5f5',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      whileHover={{
        scale: 1.03,
      }}
      onClick={() => onClick(index)}
    >
      <motion.img
        src={src}
        alt={`Image ${index + 1}`}
        loading="lazy"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement; // Приводим тип к HTMLImageElement
          target.src = image2; // fallback на другое изображение
        }}
      />
    </motion.div>
  );
};

export const MasonryGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [imageLoading, setImageLoading] = useState<boolean[]>(
    Array.from({ length: images.length }, () => true)
  );

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const breakpointColumnsObj = {
    default: 3,
    1_100: 2,
    700: 1,
  };

  return (
    <div style={{ padding: '40px' }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((src, index) => (
          <div key={index}>
            {imageLoading[index] ? (
              <Skeleton height={300} width="100%" /> // Плейсхолдер
            ) : (
              <AnimatedImage
                src={src}
                index={index}
                onClick={setLightboxIndex}
              />
            )}
            <img
              src={src}
              alt={`Number ${index + 1}`}
              style={{ display: 'none' }}
              onLoad={() => handleImageLoad(index)} // Ожидаем загрузку
            />
          </div>
        ))}
      </Masonry>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={images.map((src) => ({ src }))}
        index={lightboxIndex}
      />

      <style>{`
        .my-masonry-grid {
          display: flex;
          margin-left: -20px;
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 20px;
          background-clip: padding-box;
        }

        @media (max-width: 700px) {
          .my-masonry-grid {
            display: block;
          }
          .my-masonry-grid_column {
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  );
};
