import React, { Fragment } from 'react';
import { Info } from 'utils/types';

function InfoList({ list }: InfoListProps) {
    return (
        <>
            {list.map(({ name, slug }, idx) => (
                <Fragment key={slug}>
                    {idx < list.length - 1 ? `${name}, ` : name}
                </Fragment>
            ))}
        </>
    );
}

interface InfoListProps {
    list: Info[];
}

export default InfoList;
