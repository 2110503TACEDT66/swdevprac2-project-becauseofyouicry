"use client"
import LocationDateReserve from "@/components/LocationDateReserve";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";

// Styled TextField with white border
const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: white;
    }
  }
  & label {
    color: white;
`;

export default function Bookings() {
  // Styled div to adjust its size and center its contents
  const StyledDiv = styled.div`
    width: 80%; /* Adjust div width */
    max-width: 600px; /* Set max-width if necessary */
    margin: 0 auto; /* Center the div horizontally */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    border-radius: 5%;
  `;

  return (
    <main className="w-full flex flex-col items-center space-y-4">
      <StyledDiv className="w-full max-w-lg space-y-2 mt-8" style={{ backgroundColor: "#576453" }}>
        <WhiteBorderTextField
          label="Campground"
          className="mt-6  w-[80%]"
        />
        <LocationDateReserve />
      </StyledDiv>
      <StyledDiv className="w-full max-w-lg space-y-2 ">
        <Button variant="contained" className="w-full" style={{ backgroundColor: "#576453" }}>
          Book
        </Button>
      </StyledDiv>
    </main>
  );
}
