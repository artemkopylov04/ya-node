import React from 'react';

export interface onClick {
    (event: React.MouseEvent<HTMLElement>): void
}

export interface onChange {
    (event: React.FormEvent<HTMLInputElement>): void
}

export interface Build {
    id: string,
    extended?: boolean,
    buildNumber: string,
    commitMessage: string,
    branchName: string,
    commitHash: string,
    status?: string,
    authorName: string,
    start: string,
    duration?: string,
    onClick?: onClick,
}

export interface Log {
    content: string,
  }

export interface FormComponent {
    title: string,
    required: boolean,
    state: string | number,
    style: string,
    type: string,
    error?: string,
    placeholder: string,
    clearHandler?: onClick,
    onChangeHandler: onChange,
    before?: string,
    after?: string,
}

export interface Form {
    title: string,
    description: string,
    components: FormComponent[],
    handlers: {
        submit: any,
        cancel: any,
    },
    error: {
        status: boolean,
        text: string,
    },
    submitText: string,
    cancelText: string,
}