import { Box } from "@mui/system";
import Header from "../../Header";
const GraphWrapper = ({ title, subtitle, height, children }) => {
  return (
    <Box m="20 px">
      <Header
        title={title}
        subtitle={subtitle}
      ></Header>
      <Box height={height}>{children}</Box>
    </Box>
  );
};
export default GraphWrapper;
