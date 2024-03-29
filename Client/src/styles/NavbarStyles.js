import sizes from "./sizes";
export default {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh"
  },
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "20px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto, sans-serif",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": { textDecoration: "none", color: "black" },
    [sizes.down("xs")]: {
      display: "none"
    }
  },
  slider: {
    width: "340px",
    margin: "0 12px",
    display: "inline-block",
    [sizes.down("sm")]: {
      width: "150px"
    }
  },
  selectContainer: {
    marginLeft: "auto",
    marginRight: "1rem"
  }
};
