import { useContext } from "react";
import { Navbar, Text, Button, Dropdown } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context";

const { Menu, Item, Trigger } = Dropdown;

const AppNavbar = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
      localStorage.clear();
      navigate("/user/signin");
  }

  return <Navbar isBordered variant="sticky" className="mb-5">
    <Navbar.Toggle className="invisible" />
    <Navbar.Brand>
      <Text h2 color="primary" weight="bold" onClick={() => navigate("/")} css={{ cursor: "pointer" }}>
        Order Management
      </Text>
    </Navbar.Brand>
    <Navbar.Content>
      {user?.token ?
        <Dropdown>
          <Trigger>
              <Dropdown.Button auto color="gradient" borderWeight="bold">
                {user?.name}
              </Dropdown.Button>
          </Trigger>
          <Menu color="primary" aria-label="Actions" onAction={signOut}>
            <Item color="error" textValue={"Logout"} className="text-center"><Text color="error" >Sign Out</Text></Item>
          </Menu>
        </Dropdown>
        :
        <Button auto flat onPress={() => navigate("/user/signin")}>Sign In</Button>}
    </Navbar.Content>
  </Navbar>
}

export default AppNavbar;