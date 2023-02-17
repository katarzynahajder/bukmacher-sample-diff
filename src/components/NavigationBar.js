import format from 'date-fns/format'

const NavigationBar=()=>{
    const date=new Date();
    return <p style={{margin: "auto", padding: 30}}>{`${format(date, 'MM/dd/yyyy')}`}</p>
}

export default NavigationBar