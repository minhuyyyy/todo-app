//types
import { Inputs } from '@/types/Input';

//components
import { Form, InputGroup } from 'react-bootstrap';

//validator
import { UseFormRegister } from 'react-hook-form';

interface StatusItem {
    name: string;
    color: string;
}

function SelectInput({
    className,
    value,
    onChange,
    data,
    id,
    register,
}: {
    className?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    data: string[] | StatusItem[];
    id: string;
    register?: UseFormRegister<Inputs>;
}) {
    return (
        <InputGroup className={`${className} w-100`}>
            <Form.Select
                id={id}
                value={value}
                {...(register
                    ? register(id as keyof Inputs, {
                          required: `This field is required`,
                      })
                    : {})}
                onChange={onChange}
            >
                <option
                    value=''
                    disabled
                    hidden
                >
                    {`Select a ${id}`}
                </option>
                {data.map((item) =>
                    typeof item === 'string' ? (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ) : (
                        <option
                            key={item.name}
                            value={item.name}
                            style={{ color: item.color }}
                        >
                            {item.name}
                        </option>
                    ),
                )}
            </Form.Select>
        </InputGroup>
    );
}

export default SelectInput;
