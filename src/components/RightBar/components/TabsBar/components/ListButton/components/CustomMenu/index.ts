import { Menu } from "@mui/material";
import styled from "styled-components";

const CustomMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: "0px 16px 30px 0px #7B7F9112",
    border: "1px solid #E9E9E9B2",
    borderRadius: "0px 0px 0px 6px",

    '&::-webkit-scrollbar': {
      height: '8px',
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.secondaryWhite,
    },
    '&::-webkit-scrollbar-thumb': {
      border: `2px solid ${theme.secondaryWhite}`,
      borderRadius: '40px',
      backgroundColor: '#7F858D66',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#a0a4a8',
    },
  },
}));

export default CustomMenu;