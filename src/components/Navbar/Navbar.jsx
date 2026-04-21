import {
  Avatar,
  Burger,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { NavLink, useNavigate } from "react-router";
import classes from "./HeaderMenu.module.css";
import { IconChevronDown } from "@tabler/icons-react";

const links = [
  { link: "/about", label: "Features" },
  {
    link: "#1",
    label: "Learn",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  {
    link: "#2",
    label: "Support",
    links: [
      { link: "/faq", label: "FAQ" },
      { link: "/demo", label: "Book a demo" },
      { link: "/forums", label: "Forums" },
    ],
  },
];

export function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={NavLink} to={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            {/* Parent dropdown labels are not real routes, use a button-like element */}
            <UnstyledButton className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <NavLink
        key={link.label}
        to={link.link}
        className={({ isActive }) =>
          isActive ? `${classes.link} ${classes.linkActive}` : classes.link
        }
      >
        {link.label}
      </NavLink>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>
          <h3 className="text-2xl font-semibold text-amber-600">UrbanRest</h3>
          <Group gap={10} visibleFrom="sm">
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </div>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="80%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          {links.map((link) => {
            if (link.links) {
              return (
                <DrawerLinksGroup
                  key={link.label}
                  link={link}
                  onClose={close}
                />
              );
            }

            return (
              <NavLink
                key={link.label}
                to={link.link}
                className={({ isActive }) =>
                  isActive
                    ? `${classes.link} ${classes.linkActive}`
                    : classes.link
                }
                onClick={close}
                style={{ display: "block", padding: "12px 16px" }}
              >
                {link.label}
              </NavLink>
            );
          })}
        </ScrollArea>
      </Drawer>
    </header>
  );
}

function DrawerLinksGroup({ link, onClose }) {
  // FIX: Start collapsed; each group manages its own open state independently
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      {/* FIX: Use a real button so the entire row is tappable on mobile */}
      <UnstyledButton
        className={classes.link}
        onClick={toggle}
        style={{
          display: "block",
          width: "100%",
          padding: "12px 16px",
          // Ensure there's enough tap target height on mobile
          minHeight: "44px",
        }}
      >
        <Center inline>
          <span className={classes.linkLabel}>{link.label}</span>
          <IconChevronDown
            size={14}
            stroke={1.5}
            style={{
              marginLeft: 4,
              transform: opened ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 200ms ease",
            }}
          />
        </Center>
      </UnstyledButton>

      <Collapse in={opened}>
        {link.links?.map((subLink) => (
          <NavLink
            key={subLink.link}
            to={subLink.link}
            className={({ isActive }) =>
              isActive
                ? `${classes.subLink ?? classes.link} ${classes.linkActive}`
                : (classes.subLink ?? classes.link)
            }
            onClick={onClose}
            style={{
              display: "block",
              padding: "10px 16px 10px 32px", // Indent sub-links
              minHeight: "44px", // Proper tap target
            }}
          >
            {subLink.label}
          </NavLink>
        ))}
      </Collapse>
    </>
  );
}
