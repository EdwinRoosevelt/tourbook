import React from 'react'

import { Button, Card } from "@mantine/core";

import { Plus } from "tabler-icons-react";

function AddSubPlanCard({ onClickHandler }) {
  return (
    <Button
      mt="md"
      size="xl"
      variant="default"
      color="gray"
      sx={(theme) => ({
        minHeight: 150,
        root: {
          backgroundColor: '#00acee',
        }
      })}
      onClick={()=>onClickHandler()}
    >
      <Plus size={50} />
    </Button>
  );
}

export default AddSubPlanCard