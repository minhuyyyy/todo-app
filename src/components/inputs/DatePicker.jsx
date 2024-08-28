import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse } from 'date-fns';

function DatePickerComponent({ value, onChange }) {
    const parsedValue = value
        ? parse(value, 'dd-MM-yyyy', new Date())
        : undefined;

    return (
        <div className='w-100 d-flex flex-row justify-content-start '>
            <div className='mx-4'>
                <p>Due Date:</p>
            </div>
            <DatePicker
                selected={parsedValue}
                onChange={onChange}
                dateFormat='dd-MM-yyyy'
                minDate={parsedValue || new Date()}
            />
        </div>
    );
}

export default DatePickerComponent;
