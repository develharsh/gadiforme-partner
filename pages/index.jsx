import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/globalstate";
import { ACTIONS, register } from "../store/actions";
import Seo from "../components/seo";
import {
  Input,
  FormControl,
  FormErrorMessage,
  Select,
  FormLabel,
  InputLeftAddon,
  InputGroup,
  Button,
  Spinner,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { State, City } from "country-state-city";
import $ from "jquery";
import { ArrowForwardIcon } from "@chakra-ui/icons";
const ObjOfPayload = {
  Name: "",
  Phone: "",
  Location: {
    State: "",
    City: "",
    Place: "",
  },
};

const Index = () => {
  const { dispatch } = useContext(DataContext);
  const [payload, setPayload] = useState(ObjOfPayload);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleNormChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    delete errors[e.target.name];
    setErrors(errors);
  };
  const handleDeepChange = (value, Key) => {
    payload["Location"][Key] = value;
    setPayload({ ...payload });
    delete errors[Key];
    setErrors(errors);
  };
  const handleOneSelect = (value, Key) => {
    payload["Location"][Key] = value;
    delete errors[Key];
    if (Key == "State") {
      setCities(
        City.getCitiesOfState("IN", value).map((each) => {
          return { label: each.name, value: each.name };
        })
      );
      payload.Location.City = "";
    }
    setErrors(errors);
    setPayload(payload);
  };
  useEffect(() => {
    if (states?.length == 0)
      setStates(
        State.getStatesOfCountry("IN").map((each) => {
          return { label: each.name, value: each.isoCode };
        })
      );
  }, [states]);
  const handleSubmit = async () => {
    let invalidations = {};
    invalidations = validatePayload(invalidations, payload);
    if ($.isEmptyObject(invalidations)) setErrors({});
    else {
      setErrors(invalidations);
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: ["warning", "Please Resolve Above Errors"],
      });
      return;
    }
    setIsLoading(true);
    const response = await register(payload);
    setIsLoading(false);
    const { success, message } = response;
    if (success && message) {
      setPayload(ObjOfPayload);
      dispatch({ type: ACTIONS.NOTIFY, payload: ["success", message] });
    } else {
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: ["error", response.message],
      });
    }
  };
  return (
    <>
      <Seo title="Drive With Us as Partner - partner.gadifor.me" />
      <Text fontSize="5xl" textAlign={"center"} my="2rem" color="#000">
        Become Our Partner - GadiFor.Me
      </Text>
      <div className="hometile_1">
        <img src="/assets/gadiforme-com-partner.jpg" alt="" />
      </div>
      <div className="homepage">
        <FormControl isInvalid={errors["Name"]} w="20rem">
          <FormLabel display="flex" gap="1rem">
            <span className="red">*</span> Your Name
          </FormLabel>
          <Input
            name="Name"
            value={payload.Name}
            onChange={handleNormChange}
            type="text"
          />
          <FormErrorMessage>{errors["Name"]}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors["Phone"]} w="20rem">
          <Tooltip label="WhatsApp No. Preferred for Sending Details" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> Your WhatsApp No.
            </FormLabel>
          </Tooltip>
          <InputGroup>
            <InputLeftAddon>+91</InputLeftAddon>
            <Input
              name="Phone"
              value={payload.Phone}
              onChange={handleNormChange}
              type="number"
              maxLength={10}
            />
          </InputGroup>
          <FormErrorMessage>{errors["Phone"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem" isInvalid={errors["State"]}>
          <Tooltip label="State" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> From State
            </FormLabel>
          </Tooltip>
          <Select
            placeholder="Click to Select"
            onChange={(e) => handleOneSelect(e.target.value, "State")}
          >
            {states.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors["State"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem" isInvalid={errors["City"]}>
          <Tooltip label="City" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> From City
            </FormLabel>
          </Tooltip>
          <Select
            placeholder="Click to Select"
            onChange={(e) => handleOneSelect(e.target.value, "City")}
          >
            {cities.map((each, idx) => (
              <option value={each.value} key={idx}>
                {each.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors["City"]}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors["Place"]} w="20rem">
          <Tooltip label="Area/Sector/Colony" hasArrow>
            <FormLabel display="flex" gap="1rem">
              <span className="red">*</span> Place (Area/Sector/Colony)
            </FormLabel>
          </Tooltip>
          <Input
            name="Place"
            value={payload.Location.Place}
            onChange={(e) => handleDeepChange(e.target.value, "Place")}
            type="text"
          />
          <FormErrorMessage>{errors["Place"]}</FormErrorMessage>
        </FormControl>
        <FormControl w="20rem">
          {isLoading && <Spinner mr="1rem" />}
          <Button
            colorScheme="purple"
            onClick={handleSubmit}
            leftIcon={<ArrowForwardIcon />}
          >
            Register
          </Button>
        </FormControl>
      </div>
    </>
  );
};

const validatePayload = (invalidations, payload) => {
  if (!payload.Name) invalidations.Name = "Name is missing";
  if (!payload.Phone) invalidations.Phone = "Phone is missing";
  if (!invalidations.Phone && payload.Phone.length != 10)
    invalidations.Phone = "Phone must be 10 Digit Long";
  if (!payload.Location.State) invalidations["State"] = "Please Select State";
  if (!payload.Location.City) invalidations["City"] = "Please Select City";
  if (!payload.Location.Place) invalidations["Place"] = "Please Select Place";
  return invalidations;
};

export default Index;
