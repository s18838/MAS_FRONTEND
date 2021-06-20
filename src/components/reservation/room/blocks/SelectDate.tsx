import React, { forwardRef } from 'react';
import './ReservationBlock.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BarLoader from 'react-spinners/BarLoader';

type SelectDateProp = {
    date: Date | null,
    isFree: boolean | null,
    dateLoading: boolean,
    isDateConfirmed: boolean,
    setDate: (_: Date | null) => void,
}

export default function SelectDate({ date, dateLoading, isFree, setDate, isDateConfirmed }: SelectDateProp) {

    const selectedDate = date && `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.`
        + `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.`
        + `${date.getFullYear()}`

    const CustomDatePicker = forwardRef<HTMLButtonElement, React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>(
        ({value, onClick}, ref) => (
            <button id="date-picker" onClick={onClick} ref={ref}>
                { value === '' ? "SELECT DATE" : value }
            </button>
        ),
    );

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);

	return !isDateConfirmed ? (
        <div className="settings-block">
            <p>Check a date:</p>
            <div>
                <DatePicker selected={date}
                    minDate={minDate}
                    dateFormat="dd.MM.yyyy"
                    onChange={date => date instanceof Date ? setDate(date) : null} 
                    customInput={<CustomDatePicker />}/>
            </div>
            {
                dateLoading && (
                    <div id="date-loading-spinner">
                        <BarLoader loading={true} width={75} height={5} />
                    </div>
                )
            }
            {
                isFree != null && (isFree ? 
                (<p className="date-free">FREE</p>) : 
                (<p className="date-occupied">OCCUPIED</p>))
            }
        </div>
    ) : (
        <div className="settings-block">
            <p>Selected date:</p>
            <div className="value-block">
                { selectedDate }
            </div>
        </div>
    );
}
