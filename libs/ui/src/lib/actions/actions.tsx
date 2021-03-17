import React from 'react';
import { Link } from 'react-router-dom';

export interface Action {
  label: string,
  path: string,
  color: string,
}

export interface ActionsProps {
  actions: Action[]
}

export function Actions({ actions }: ActionsProps) {
  return actions.length > 0 ? (
    <div className="actions-block">
      {
        actions.map((action, i) => {
          return <Link key={i} to={action.path} className={`button-outline--${action.color}`}>
            {action.label}
          </Link>
        })
      }
    </div>
  ) : null;
}

export default Actions;
