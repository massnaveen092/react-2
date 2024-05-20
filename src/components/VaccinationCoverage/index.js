import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const dataformatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {VaccinationCoverageDetails} = props

  return (
    <div>
      <h1>Vaccination Coverage</h1>
      <BarChart
        height={400}
        width={900}
        data={VaccinationCoverageDetails}
        margin={{top: 5}}
      >
        <XAxis
          datakey="vaccineDate"
          tick={{
            stroke: '#6c757d',
            strokewidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataformatter}
          tick={{
            stroke: '#6c757d',
            strokewidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          datakey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />
        <Bar
          datakey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
