import React from 'react';
import { Task, Filter } from '../../types/taskTypes';

import Fab from '@mui/material/Fab';
import CreateIcon from '@mui/icons-material/CreateRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';

import { styled } from '@mui/material/styles';

type Props = {
  tasks: Task[];
  filter: Filter;
  alertOpen: boolean;
  dialogOpen: boolean;
  toggleAlert: () => void;
  toggleDialog: () => void;
};

const FabButton = styled(Fab)({
  position: 'fixed',
  right: 15,
  bottom: 15,
});

export const ActionButton: React.FC<Props> = (props: Props) => {
  const removed = props.tasks.filter((task) => task.removed).length !== 0;

  return (
    <>
      {props.filter === 'removed' ? (
        <FabButton
          aria-label="delete-button"
          color="secondary"
          onClick={props.toggleAlert}
          disabled={!removed || props.alertOpen}>
          <DeleteIcon />
        </FabButton>
      ) : (
        <FabButton
          aria-label="add-button"
          color="secondary"
          onClick={props.toggleDialog}
          disabled={props.filter === 'checked' || props.dialogOpen}>
          <CreateIcon />
        </FabButton>
      )}
    </>
  );
};
