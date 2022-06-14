import Link from 'next/link';
import {
  createStyles,
  Card,
  Overlay,
  CardProps,
  Button,
  Text,
  useMantineTheme,
  TextInput
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: 240,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: theme.spacing.xl
  },

  content: {
    position: 'absolute',
    padding: theme.spacing.xl,
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  action: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
  },

  title: {
    color: theme.white,
    marginBottom: theme.spacing.xs / 2,
  },

  description: {
    color: theme.white,
    maxWidth: 220,
  },
}));

const data = {
  image:
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  title: "Create a New Tour",
  description:
    "Plan a tour, add your friends and make all your every tour memorable! ",
};

export default function CreateTourBanner() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
    
  return (
    <Card
      radius="md"
      style={{ backgroundImage: `url(${data.image})` }}
      className={cx(classes.card)}
    >
      <Overlay
        gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[4]} 100%)`}
        opacity={0.55}
        zIndex={0}
      />

      <div className={classes.content}>
        <Text size="lg" weight={700} className={classes.title}>
          {data.title}
        </Text>

        <Text size="sm" className={classes.description}>
          {data.description}
        </Text>

        <Link href="/createTour">
          <Button
            className={classes.action}
            size="sm"
            variant="filled"
            sx={{ color: "white", borderColor: "white" }}
          >
            Create Tour
          </Button>
        </Link>
      </div>
    </Card>
  );
}
