import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%; 
  margin: 0 auto; 

`;

const Path = styled.path`
  transition: all 0.3s ease;
  cursor: pointer;
  transform-origin: center; /* Set the origin of transformation to the center */
  fill: rgba(170, 170, 170, 0.33);

  &:hover {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)); /* Drop shadow for lifting effect */
    fill: rgba(170, 170, 170, 0.5);
  }
`;

const AccentPath = styled.path`
  fill: rgba(130, 130, 130, 1);
`;

 const Svg = styled.svg`
  width: 100%; 
  height: auto; 
`;

const Room2 = () => {
  const navigate = useNavigate();

  const handleWallClick = (wallName) => {
    console.log(`Wall clicked: ${wallName}`);
    navigate(`/wall/${wallName}`);
  };

  return (
  <Container>
  <Svg viewBox="0 0 297 210" preserveAspectRatio="xMidYMid meet">
    <Path d="m-0.26381 149.88h18.501l-3.7824-50.561 17.51-16.244-14.421-16.016-0.47914-32.84 20.715-11.336 9.1306-8.2707 111.31 10.583 11.974-11.535h105.24l9.2679 24.104v22.702h12.564v-60.597h-297.53z"
          onClick={() => handleWallClick('backwall')}
    />
    <Path d="m109.8 87.845-7.9366 28.94 52.426 18.39 19.341-21.854 39.729 20.64 24.179-23.083-12.825-27.152-33.557-2.9211-29.537 7.0404-4.5889-30.192-23.497-3.43-4.8151 31.306z" 
          onClick={() => handleWallClick('island/back')}       
    />
    <AccentPath d="m14.454 99.316 11.905-16.5-8.8169-15.76 14.421 16.016-17.51 16.244" />
    <AccentPath d="m17.064 34.217 19.676-12.861 10.169-6.7453-9.1306 8.2707-20.715 11.336" />
    <AccentPath d="m46.909 14.61 110.28 7.3242 13.007-8.2768-11.974 11.535-111.31-10.583" />
    <AccentPath d="m14.454 99.316 1.375 50.561h2.4075l-3.7824-50.561" />
    <AccentPath d="m-0.26381 31.502 3.7139-28.452 43.459-3.1833h-47.173v30.856" />
    <AccentPath d="m297.26-0.13301h-21.833l19.736 2.4004 2.0976 34.661v-37.061" />
    <AccentPath d="m275.43 13.658 6.5624 11.813 2.7055 12.291-9.2679-24.104" />
    <AccentPath d="m284.7 37.762 1.9917 22.702h-1.9917v-22.702" />
    <AccentPath d="m128.72 85.529 6.0552-29.369 22.257 1.493-23.497-3.43z" />
    <AccentPath d="m161.62 87.845 29.907-5.4266 33.187 1.3072-33.557-2.9211-29.537 7.0404" />
    <AccentPath d="m101.87 116.78 51.816 16.547 19.95-20.01-19.341 21.854-52.426-18.39" />
    <AccentPath d="m213.36 133.96 22.268-23.192-10.913-27.044 12.825 27.152z" />
  </Svg>
    </Container>
  );
};

export default Room2;
