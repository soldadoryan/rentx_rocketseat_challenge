import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage } from './styles';

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[],
  changed: ViewToken[]
}

const ImageSlider: React.FC<Props> = ({ imagesUrl }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;

    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => <ImageIndex
          key={String(index)}
          active={index === imageIndex}
        />)}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        onViewableItemsChanged={indexChange.current}
      />
    </Container >
  );
}

export default ImageSlider;