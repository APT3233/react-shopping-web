import { useState } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom"; 

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [focusedItem, setFocusedItem] = useState(null); 
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleFocus = (item) => {
    setFocusedItem(item); 
  };

  const handleBlur = () => {
    setFocusedItem(null);
  };

  return (
    <>
      {isMobile && (
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={handleDrawerToggle}
          sx={{
            width: openDrawer ? "250px" : "0px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: openDrawer ? "250px" : "0px",
              transition: "width 0.3s ease-in-out",
              outline: "none",
            },
          }}
          tabIndex={-1}
        >
          <List>
            {["Home", "Product", "Cart", "Contact", "Login"].map((text) => (
              <ListItem
                key={text}
                button
                component={NavLink} 
                to={text === "Home" ? "/" : `${text.toLowerCase()}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  backgroundColor: focusedItem === text ? "#e0e0e0" : "transparent", // Làm nổi bật khi focus
                }}
                onFocus={() => handleFocus(text)} 
                onBlur={handleBlur} 
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          style={{ position: "absolute", left: 30 }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
};

export default Navbar;
