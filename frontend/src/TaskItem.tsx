import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import { lightBlue, pink, grey } from '@mui/material/colors';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  task: Task;
  onEdit: (id: number, title: string) => void;
  onCheck: (id: number, checked: boolean) => void;
  onRemove: (id: number, removed: boolean) => void;
  filter: Filter;
};

const TaskCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));

const Form = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontSize: '16px',
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const Button = styled('button')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));

const Trash = styled('button')(() => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}));

export const TaskItem = (props: Props) => {
  return (
    <TaskCard>
      <Form>
        <TextField
          fullWidth
          variant="standard"
          value={props.task.value}
          onChange={(e) => props.onEdit(props.task.id, e.target.value)}
          disabled={props.task.checked || props.task.removed}
        />
      </Form>
      <ButtonContainer>
        <Button
          onClick={() => props.onCheck(props.task.id, props.task.checked)}
          disabled={props.filter === 'removed'}
          aria-label="check"
        >
          {props.task.checked ? (
            <CheckIcon
              style={{
                color: props.filter !== 'removed' ? pink.A200 : grey[500],
              }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              style={{
                color: props.filter !== 'removed' ? lightBlue[500] : grey[500],
              }}
            />
          )}
          <Typography
            style={{
              userSelect: 'none',
              color:
                props.task.checked && props.filter !== 'removed'
                  ? pink.A200
                  : grey[500],
            }}
          >
            Done
          </Typography>
        </Button>
        <Trash
          onClick={() => props.onRemove(props.task.id, props.task.removed)}
          aria-label="trash"
        >
          {props.task.removed ? (
            <UndoIcon style={{ color: lightBlue[500] }} />
          ) : (
            <DeleteIcon style={{ color: grey[500] }} />
          )}
        </Trash>
      </ButtonContainer>
    </TaskCard>
  );
};
