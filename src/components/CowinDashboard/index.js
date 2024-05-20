import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

const apistatus2 = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apistatus: apistatus2.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getVaccinationdata()
  }

  getVaccinationdata = async () => {
    this.setState({
      apistatus: apistatus2.inProgress,
    })
    const apiurl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiurl)
    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedData = {
        last7daysvaccination: fetchData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationbyAge: fetchData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }
      this.setState({
        vaccinationData: updatedData,
        apistatus: apistatus2.success,
      })
    } else {
      this.setState({
        apistatus: apistatus2.failure,
      })
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderVaccinationStats = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          VaccinationCoverageDetails={vaccinationData.last7daysvaccination}
        />
        <VaccinationByGender
          VaccinationByGenderDetails={vaccinationData.vaccinationByGender}
        />
        <VaccinationByAge
          VaccinationByAgeDetails={vaccinationData.vaccinationbyAge}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="Loader">
      <Loader height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderViewBasedApiStatus = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apistatus.success:
        return this.renderVaccinationStats()
      case apistatus.failure:
        return this.renderFailureView()
      case apistatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1>Co-Win</h1>
          </div>
          <h1>CoWin Vaccination in India</h1>
          {this.renderViewBasedApiStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
