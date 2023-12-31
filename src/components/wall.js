import styled from 'styled-components';
import GlobalStyle from '../globalStyles.js';
import { useState, useEffect } from 'react';
import ImageMapper from 'react-image-mapper';
import { useForm } from "react-hook-form";
import island from '../images/island.svg'

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
`;

const Tooltip = styled.span`
  position: absolute;
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

const COLORS = {green: {preFillColor: "rgba(0, 255, 25, 0.15)",
                        fillColor: "rgba(0, 255, 25, 0.2)"},
                white: {preFillColor: "rgba(255, 255, 255, 0.15)",
                        fillColor: "rgba(255, 255, 255, 0.2)"},
                blue: {preFillColor: "rgba(0, 0, 255, 0.15)",
                        fillColor: "rgba(0, 0, 255, 0.2)"},
                black: {preFillColor: "rgba(0, 0, 0, 0.15)",
                        fillColor: "rgba(0, 0, 0, 0.2)"},
                red: {preFillColor: "rgba(255, 0, 0, 0.15)",
                        fillColor: "rgba(255, 0, 0, 0.2)"},
                purple: {preFillColor: "rgba(167, 0, 255, 0.15)",
                        fillColor: "rgba(167, 0, 255, 0.2)"},
                yellow: {preFillColor: "rgba(255, 255, 0, 0.15)",
                        fillColor: "rgba(255, 255, 0, 0.2)"},
                orange: {preFillColor: "rgba(255, 100, 0, 0.15)",
                        fillColor: "rgba(255, 100, 0, 0.2)"},
}

function Wall() {
  const [hoveredArea, setHoveredArea] = useState(null);

  const [adminMode, setAdminMode] = useState(false);
  const [makingSelection, setMakingSelection] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const basePolygonArea = [
    {
      name: "",
      shape: "poly",
      coords: [],
      preFillColor: "rgba(0, 0, 255, 0.15)",
      fillColor: "rgba(0, 0, 255, 0.2)",
    },
  ];

  const [adminLayout, setAdminLayout] = useState({
    name: "adminLayout",
    areas: basePolygonArea,
  });

  const [userLayout, setUserLayout] = useState({
    name: "userLayout",
    areas: [],
  });

  const getTipPosition = (area) => {
    const [x,y] = area.center
    return { top: `${y}px`, left: `${x}px` };
  };

  const makeDot = (evt) => {
    if (!makingSelection) {
      return
    }
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    const areasCopy = [...adminLayout.areas];
    areasCopy.push({
      name: "1",
      shape: "circle",
      coords: [coords.x, coords.y, 1],
      preFillColor: "yellow",
      lineWidth: 6,
    });

    areasCopy[0].coords.push(coords.x);
    areasCopy[0].coords.push(coords.y);

    const adminLayoutCopy = { ...adminLayout, areas: areasCopy };
    setAdminLayout(adminLayoutCopy);
  };

  const makeDot2 = (area, evt) => {
    if (!makingSelection) {
      return
    }
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    const areasCopy = [...adminLayout.areas];
    areasCopy.push({
      name: "1",
      shape: "circle",
      coords: [coords.x, coords.y, 1],
      preFillColor: "yellow",
      lineWidth: 6,
    });

    areasCopy[0].coords.push(coords.x);
    areasCopy[0].coords.push(coords.y);

    const adminLayoutCopy = { ...adminLayout, areas: areasCopy };
    setAdminLayout(adminLayoutCopy);

  };

  const resetHandler = () => {
    const resetArea = basePolygonArea;

    // name: "P1",
    // shape: "poly",
    // coords: [],
    // preFillColor: "rgba(0, 0, 255, 0.15)",
    // fillColor: "rgba(0, 0, 255, 0.2)"

    const adminLayoutCopy = { ...adminLayout, areas: resetArea };
    setAdminLayout(adminLayoutCopy);
    reset();
  };

  const addPolygonHandler = (data) => {
    const areasCopy = [...userLayout.areas];

    areasCopy.push(adminLayout.areas[0]);

    adminLayout.areas[0].name = data.name;
    adminLayout.areas[0].rating = data.rating;
    adminLayout.areas[0].userName = data.userName;
    adminLayout.areas[0].description = data.description;
    adminLayout.areas[0].color = data.color;
    adminLayout.areas[0].preFillColor = COLORS[data.color].preFillColor
    adminLayout.areas[0].fillColor = COLORS[data.color].fillColor

    const userLayoutCopy = { ...userLayout, areas: areasCopy };

    setUserLayout(userLayoutCopy);

    setAdminMode(false);
    resetHandler();
  };

  const handleAddClimb = () => {
    setMakingSelection(true);
    setAdminMode(true);
  }

  const handleChangeColor = (event) => {
    const color = event.target.value
    const areasCopy = [...adminLayout.areas];

    adminLayout.areas[0].preFillColor = COLORS[color].preFillColor
    adminLayout.areas[0].fillColor = COLORS[color].fillColor

    const adminLayoutCopy = { ...adminLayout, areas: areasCopy };
    setAdminLayout(adminLayoutCopy);
  }

  return (
    <AppContainer>
    <GlobalStyle/>
    <WallContainer>
      {adminMode ?
        <AddingClimbs>
          <ImageMapper
          src={island}
          map={adminLayout}
          width={700}
          onImageClick={(evt) => makeDot(evt)}
          onClick={(area, _, evt) => makeDot2(area, evt)}
          />
          {makingSelection ? 
          <SelectionButtons>
            <Button 
              onClick={() => setMakingSelection(false)}
              disabled={adminLayout.areas[0].coords.length <= 6}
            >
              Confirm selection
            </Button>
            <Button onClick={() => resetHandler()}>Reset Selection</Button>
          </SelectionButtons>
          :
          <StyledForm onSubmit={handleSubmit(addPolygonHandler)}>
              <Label htmlFor="name">Climb Name</Label>
              <Input {...register("name", { required: "Climb Name is required" })} />
              {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

              <Label htmlFor="rating">Rating</Label>
              <Select {...register("rating")}>
                  <option value="easy">Easy</option>
                  <option value="right">Bang on</option>
                  <option value="hard">Hard</option>
              </Select>

              <Label htmlFor="userName">Your name</Label>
              <Input {...register("userName", { required: "Your name is required" })} />
              {errors.userName && <ErrorMessage>{errors.userName.message}</ErrorMessage>}

              <Label htmlFor="description">Description</Label>
              <Input {...register("description")} />

              <Label htmlFor="color">Colour</Label>
              <Select {...register("color")} onChange={handleChangeColor}>
                  <option value="green">Green</option>
                  <option value="white">White</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                  <option value="yellow">Yellow</option>
                  <option value="orange">Orange</option>
              </Select>
              <Button type="submit">Add climb</Button>
          </StyledForm>
          }
        </AddingClimbs>
        :
        <ImageMapper
          src={island}
          map={userLayout}
          width={700}
          onImageClick={() => {}}
          onImageMouseMove={() => {}}
          onLoad={() => {}}
          onMouseMove={(area, _, evt) => {}}
          onClick={(area) => {}}
          onMouseEnter={(area) => setHoveredArea(area)}
          onMouseLeave={(area) => setHoveredArea(null)}
          lineWidth={2}
          strokeColor={"rgba(255, 255, 255, 0.1)"}
        />
      } 

      {hoveredArea && (
        <Tooltip
        style={{ ...getTipPosition(hoveredArea) }}
        >
        {hoveredArea && hoveredArea.name}
        </Tooltip>
      )}
    </WallContainer>
    {!adminMode &&
    <Button type="submit" onClick={handleAddClimb}>
      Add Climb
    </Button>
    }
    </AppContainer>
  );
}

export default Wall;
