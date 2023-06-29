import React from 'react'

type Props = {
  error: string
}

export const ErrorLabel: React.FC<Props> = ({
  error,
}) => {
  return (
    <>
      {error && (
        <div className="notification is-danger is-light has-text-weight-normal">
          {error}
        </div>
      )}
    </>
  )
}