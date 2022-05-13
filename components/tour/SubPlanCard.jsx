import React, { useState } from "react";
import {
  Card,
  Select,
  Text,
  SimpleGrid,
  TextInput,
  Button,
  Group,
  MultiSelect,
  Progress
} from "@mantine/core";
import { range } from "@mantine/hooks";

import { TrashX, Copy } from "tabler-icons-react";

const typeList = [ "Travel", "Stay", "Visit", "Others"];

const travelByList = ["Bike", "Car", "Train", "Flight"];

const whenList = ["Night", "Morning", "Afternoon", "Evening", "9 am", "10 am", "11 am", "12 pm"]

const newWhenList = [
        { value: 'Rick', group: 'Used to be a pickle' },
        { value: 'Morty', group: 'Never was a pickle' },
        { value: 'Beth',  group: 'Never was a pickle' },
        { value: 'Summer', group: 'Never was a pickle' },
      ];

var dayList = [];
 
function SubPlanCard({ value, days, deleteCardHandler }) {

    const [type, setType] = useState(value.type);
    const [day, setDay] = useState("");
    const [travelBy, setTravelBy] = useState("");
    const [when, setWhen] = useState("");
    const [progress, setProgress] = useState();

    const typeChangeHandler = (newType) => {
        setTravelBy("")
        setType(newType)
    }

    dayList = Array(days).fill(0).map((_, index) => `Day ${index}`)

  return (
    <Card
      mt="sm"
      shadow="xl"
      p="sm"
      
    >
      <Group grow position="right">
        <Progress value={progress} />
      </Group>
      <SimpleGrid
        mt="md"
        cols={2}
        spacing={10}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Select
          label="Type"
          placeholder="Travel, Visit, Stay, ..."
          data={typeList}
          value={type}
          onChange={typeChangeHandler}
        />
        <Select
          label="Day"
          placeholder="Day 01, 02, ..."
          data={dayList}
          value={day}
          onChange={setDay}
        />
      </SimpleGrid>
      {type === "Travel" && (
        <Select
          mt="md"
          label="By"
          placeholder="Bike, Car, Train, ..."
          data={travelByList}
          value={travelBy}
          onChange={setTravelBy}
        />
      )}
      {type === "Stay" && (
        <TextInput mt="md" placeholder="ITC chola or at Friend's" />
      )}
      {travelBy && <TextInput mt="md" placeholder={`${travelBy} Details`} />}
      <MultiSelect
        mt="md"
        label="When"
        placeholder="Scroll to see all options!"
        dropdownComponent="div"
        creatable
        data={whenList}
        value={when}
        onChange={setWhen}
      />
      <Group grow>
        <Button
          mt="md"
          variant="outline"
          color="red"
          onClick={() => deleteCardHandler(value.id)}
        >
          <TrashX size={25} />
        </Button>
      </Group>
    </Card>
  );
}

export default SubPlanCard