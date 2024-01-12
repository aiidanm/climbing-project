import styled from "styled-components";
import GlobalStyle from "../globalStyles.js";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import islandWall from "../images/island.svg";
import islandFront from "../images/island_front.svg";
import { postNewClimb } from "./apirequests.js";

const WALL_IMAGES = { island: { back: islandWall, front: islandFront } };

const COLORS = {
  green: {
    preFillColor: "rgba(0, 255, 25, 0.5)",
    fillColor: "rgba(0, 255, 25, 0.7)",
  },
  white: {
    preFillColor: "rgba(255, 255, 255, 0.5)",
    fillColor: "rgba(255, 255, 255, 0.7)",
  },
  blue: {
    preFillColor: "rgba(0, 0, 255, 0.5)",
    fillColor: "rgba(0, 0, 255, 0.7)",
  },
  black: {
    preFillColor: "rgba(0, 0, 0, 0.5)",
    fillColor: "rgba(0, 0, 0, 0.7)",
  },
  red: {
    preFillColor: "rgba(255, 0, 0, 0.5)",
    fillColor: "rgba(255, 0, 0, 0.7)",
  },
  purple: {
    preFillColor: "rgba(167, 0, 255, 0.5)",
    fillColor: "rgba(167, 0, 255, 0.7)",
  },
  yellow: {
    preFillColor: "rgba(255, 255, 0, 0.5)",
    fillColor: "rgba(255, 255, 0, 0.7)",
  },
  orange: {
    preFillColor: "rgba(255, 100, 0, 0.5)",
    fillColor: "rgba(255, 100, 0, 0.7)",
  },
};

const Svg = styled.svg`
  width: 100%;
  height: auto;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
  position: relative;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const AppContainer = styled.div`
  gap: 2em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WallContainer = styled.div`
  position: relative;
  gap: 1rem;
  width: 100%;
  max-width: 700px;
  margin: auto;
  height: auto;
`;

const Tooltip = styled.span`
  position: fixed;
  color: #fff;
  padding: 5px 10px 5px 10px;
  background: rgba(0, 0, 0, 0.5);
  transform: translate3d(-50%, -50%, 0);
  border-radius: 5px;
  pointer-events: none;
  z-index: 1000;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  align-items: center;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  width: -webkit-fill-available;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  background-color: #e62a32;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover {
    background-color: #bf232a;
  }

  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: default;
    opacity: 0.6;
  }
`;

const Circle = styled.circle`
  &:hover {
    fill: ${(props) => props.hoverFill};
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const AddingClimbs = styled.div`
  gap: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectionButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
`;

function Wall() {
  const { wallName, view } = useParams();
  const imagePath = WALL_IMAGES[wallName][view];

  const [hoveredDot, setHoveredDot] = useState(null);

  const [adminMode, setAdminMode] = useState(false);
  const [makingSelection, setMakingSelection] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [dotPosition, setDotPosition] = useState(null);
  const [dotColor, setDotColor] = useState("rgba(0,0,255,0.7)");
  const [dots, setDots] = useState([]);

  const [viewBox, setViewBox] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setViewBox(`0 0 ${img.naturalWidth} ${img.naturalHeight}`);
    };
    img.src = imagePath;
  }, [imagePath]);

  const handleSVGClick = (event) => {
    if (!makingSelection) {
      return;
    }

    const svg = event.currentTarget;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const transformedPoint = point.matrixTransform(
      svg.getScreenCTM().inverse()
    );

    setDotPosition({ x: transformedPoint.x, y: transformedPoint.y });
  };

  const getTipPosition = (dot) => {
    const { x, y } = dot.position;
    const offset = 30;
    return { top: `${y - offset}px`, left: `${x}px` };
  };

  const resetHandler = () => {
    setDotPosition(null);
    reset();
  };

  const addPointHandler = (data) => {
    const dot = {
      name: data.name,
      rating: data.rating,
      fillColor: COLORS[data.color].preFillColor,
      hoverColor: COLORS[data.color].fillColor,
      position: dotPosition,
    };

    setDots([...dots, dot]); // Add the new dot to the existing dots
    postNewClimb(dot); // save to database here
    setAdminMode(false);
    resetHandler();
  };

  const handleAddClimb = () => {
    setMakingSelection(true);
    setAdminMode(true);
  };

  const handleChangeColor = (event) => {
    const color = event.target.value;
    setDotColor(COLORS[color].fillColor);
  };

  const handleHoverDot = (event, dot) => {
    const svg = event.currentTarget.parentNode;
    const point = svg.createSVGPoint();
    point.x = dot.position.x;
    point.y = dot.position.y;

    const screenCTM = svg.getScreenCTM();
    const screenPoint = point.matrixTransform(screenCTM);
    setHoveredDot({ ...dot, position: { x: screenPoint.x, y: screenPoint.y } });
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <WallContainer>
        {adminMode ? (
          <AddingClimbs>
            <svg
              width="100%"
              height="100%"
              viewBox={viewBox}
              preserveAspectRatio="xMidYMid meet"
              onClick={handleSVGClick}
              onTouchStart={handleSVGClick}
            >
              <image href={imagePath} width="100%" height="100%" />
              {dotPosition && (
                <Circle
                  cx={dotPosition.x}
                  cy={dotPosition.y}
                  r="15"
                  fill={dotColor}
                  stroke="rgba(0,0,0,0.8)"
                  strokeWidth="1"
                />
              )}
            </svg>
            {makingSelection ? (
              <SelectionButtons>
                <Button
                  onClick={() => setMakingSelection(false)}
                  disabled={dotPosition === null}
                >
                  Confirm selection
                </Button>
                <Button onClick={() => resetHandler()}>Reset Selection</Button>
              </SelectionButtons>
            ) : (
              <StyledForm onSubmit={handleSubmit(addPointHandler)}>
                <Label htmlFor="name">Climb Name</Label>
                <Input
                  {...register("name", { required: "Climb Name is required" })}
                />
                {errors.name && (
                  <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}

                <Label htmlFor="rating">Rating</Label>
                <Select
                  {...register("rating", { required: "Rating is required" })}
                >
                  <option value="easy">Easy</option>
                  <option value="right">Bang on</option>
                  <option value="hard">Hard</option>
                </Select>
                {errors.rating && (
                  <ErrorMessage>{errors.rating.message}</ErrorMessage>
                )}

                <Label htmlFor="color">Colour</Label>
                <Select
                  {...register("color", { required: "Colors is required" })}
                  onChange={handleChangeColor}
                >
                  <option value="green">Green</option>
                  <option value="white">White</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="yellow">Yellow</option>
                  <option value="orange">Orange</option>
                </Select>
                {errors.color && (
                  <ErrorMessage>{errors.color.message}</ErrorMessage>
                )}
                <Button type="submit">Add climb</Button>
              </StyledForm>
            )}
          </AddingClimbs>
        ) : (
          <>
            {viewBox && (
              <Svg
                width="100%"
                height="100%"
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
              >
                <image href={imagePath} width="100%" height="100%" />
                {dots.map((dot, index) => (
                  <Circle
                    key={index}
                    cx={dot.position.x}
                    cy={dot.position.y}
                    r="15"
                    fill={dot.fillColor}
                    hoverFill={dot.hoverColor}
                    onMouseEnter={(event) => handleHoverDot(event, dot)}
                    onMouseLeave={(event) => setHoveredDot(null)}
                    stroke="rgba(0,0,0,0.8)"
                    strokeWidth="1"
                  />
                ))}
              </Svg>
            )}
          </>
        )}

        {hoveredDot && (
          <Tooltip style={{ ...getTipPosition(hoveredDot) }}>
            {hoveredDot && hoveredDot.name}
          </Tooltip>
        )}
      </WallContainer>
      {!adminMode && (
        <Button type="submit" onClick={handleAddClimb}>
          Add Climb
        </Button>
      )}
    </AppContainer>
  );
}

export default Wall;
