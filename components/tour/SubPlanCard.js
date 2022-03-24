import React, { useState } from "react";
import { Card, Select, Text, SimpleGrid, TextInput, Button, Group } from '@mantine/core';
import { range } from "@mantine/hooks";

import { TrashX, Copy } from "tabler-icons-react";

const typeList = [ "Travel", "Stay", "Visit", "Others"];

const whenList = ["Afternoon", ]

var dayList = [];
 
function SubPlanCard({ days}) {

    const [type, setType] = useState("");
    const [day, setDay] = useState("");
    const [travelBy, setTravelBy] = useState("");

    const typeChangeHandler = (newType) => {
        setTravelBy("")
        setType(newType)
    }

    dayList = Array(days).fill(0).map((_, index) => `Day ${index}`)

  return (
    <Card shadow="md" p="md">
      <Group grow position="right">
        <Button variant="light" color="green">
          <Copy size={25} />
        </Button>
        <Button variant="light" color="red">
          <TrashX size={25} />
        </Button>
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
          data={["Bike", "Car", "Train", "Flight"]}
          value={travelBy}
          onChange={setTravelBy}
        />
      )}
      {type === "Stay" && (
        <TextInput mt="md" placeholder="ITC chola or at Friend's" />
      )}
      {travelBy && <TextInput mt="md" placeholder={`${travelBy} Details`} />}
    </Card>
  );
}

export default SubPlanCard