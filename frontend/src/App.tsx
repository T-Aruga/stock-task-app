import localforage from 'localforage';
import { useState, useEffect } from 'react';

import GlobalStyles from '@mui/material/GlobalStyles';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';

import { TodoItem } from './TodoItem';
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
  const [todos, setTodos] = useState<Todo[]>([]);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) {
      setDialogOpen(false);
      return;
    }

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    setText('');
    setDialogOpen(false);
  };

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  };

  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  useEffect(() => {
    localforage
      .getItem('todo-20290925')
      .then((values) => setTodos(values as Todo[]))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    localforage.setItem('todo-20290925', todos).catch((err) => {
      console.error(err);
    });
  }, [todos]);

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
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              filter={filter}
              onCheck={handleOnCheck}
              onEdit={handleOnEdit}
              onRemove={handleOnRemove}
            />
          );
        })}
        <ActionButton
          todos={todos}
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
