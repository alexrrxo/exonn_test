import { Menu } from "@mui/material";
import styled from "styled-components";

const CustomMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    boxShadow: "0px 16px 30px 0px #7B7F9112",
		border: "1px solid #E9E9E9B2",
		borderRadius: "0px 0px 0px 6px",
  },
}));

export default CustomMenu;