import React from 'react';

import { Container } from "@mantine/core";
import NewTour from '../components/tour/NewTour'

function newTour() {
  return (
    <>
      <Container size="sm" px="xs">
        <NewTour />
      </Container>
    </>
  );
}

export default newTour