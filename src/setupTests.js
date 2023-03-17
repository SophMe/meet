import Enzyme from "enzyme";
import Adapter from "wojtekmaj/enzyme-adapter-reaxt-17";

Enzyme.configure({ adapter: new Adapter() });