import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {VaccinationByGenderDetails} = props

  return (
    <div>
      <h1>Vaccination By Gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={VaccinationByGenderDetails}
          cy="60%"
          cx="50%"
          datakey="count"
          startangle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="square"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
