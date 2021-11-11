import localforage from 'localforage';
import React, { useState, useEffect } from 'react';

import { Task } from './types/taskTypes';

import GlobalStyles from '@mui/material/GlobalStyles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

import { TaskItem } from './TaskItem';
import { FormDialog } from './FormDialog';
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

const Container = styled('div')({
  margin: '0 auto',
  maxWidth: '640px',
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
});

export const App = (): JSX.Element => {
  const [text, setText] = useState('');
  const [tasks, settasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleAlert = () => setAlertOpen(!alertOpen);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setText('');
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) {
      setDialogOpen(false);
      return;
    }

    const newTask: Task = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    settasks([newTask, ...tasks]);
    setText('');
    setDialogOpen(false);
  };

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy: Task[] = JSON.parse(JSON.stringify(tasks));

    const newTasks = deepCopy.map((task) => {
      if (task.id === id) {
        task.value = value;
      }
      return task;
    });

    settasks(newTasks);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy: Task[] = JSON.parse(JSON.stringify(tasks));

    const newTasks = deepCopy.map((task) => {
      if (task.id === id) {
        task.checked = !checked;
      }
      return task;
    });

    settasks(newTasks);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy: Task[] = JSON.parse(JSON.stringify(tasks));

    const newTasks = deepCopy.map((task) => {
      if (task.id === id) {
        task.removed = !removed;
      }
      return task;
    });

    settasks(newTasks);
  };

  const handleOnEmpty = () => {
    const newTasks = tasks.filter((task) => !task.removed);
    settasks(newTasks);
  };

  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'all':
        return !task.removed;
      case 'checked':
        return task.checked && !task.removed;
      case 'unchecked':
        return !task.checked && !task.removed;
      case 'removed':
        return task.removed;
      default:
        return task;
    }
  });

  useEffect(() => {
    localforage
      .getItem('task-20290925')
      .then((values) => settasks(values as Task[]))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage.setItem('task-20290925', tasks).catch((err) => {
      console.error(err);
    });
  }, [tasks]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} toggleDrawer={toggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        onSort={handleOnSort}
      />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        toggleDialog={toggleDialog}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleOnEmpty}
        toggleAlert={toggleAlert}
      />
      <Container>
        {filteredTasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              filter={filter}
              onCheck={handleOnCheck}
              onEdit={handleOnEdit}
              onRemove={handleOnRemove}
            />
          );
        })}
        <ActionButton
          tasks={tasks}
          filter={filter}
          alertOpen={alertOpen}
          dialogOpen={dialogOpen}
          toggleAlert={toggleAlert}
          toggleDialog={toggleDialog}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
