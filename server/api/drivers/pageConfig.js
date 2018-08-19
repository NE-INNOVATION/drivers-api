module.exports = {
    getPageConfig: (page, drivers) => {
        switch(page){
            case 'PersonalInfo': 
              questions = [
                {
                  key: 'name',
                  label: 'Name',
                  value: drivers[0].personalInfo.name,
                  required: true,
                  order: 1,
                  type: 'textbox'
                },
                {
                  key: 'maritalstatus',
                  label: 'Marital Status',
                  options: [
                    {key: 'S',  value: 'Single'},
                    {key: 'D',  value: 'Divorced'},
                    {key: 'M',   value: 'Married'},
                    {key: 'CU', value: 'Civil Union'},
                    {key: 'SP', value: 'Separated'},
                    {key: 'WD', value: 'Widowed'}
                  ],
                  value: drivers[0].personalInfo.marital_status,
                  order: 2,
                  type: 'dropdown'
                },
                {
                  key: 'gender',
                  label: 'Gender',
                  options: [
                    {key: 'M',  value: 'Male'},
                    {key: 'F',  value: 'Female'},
                  ],
                  value: drivers[0].personalInfo.gender, 
                  order: 3,
                  type: 'dropdown'
                },
                {
                  key: 'ssn',
                  label: 'Social Security Number',
                  value: drivers[0].personalInfo.ssn,
                  required: true,
                  order: 4,
                  type: 'textbox'
                },    
              ];
            break;
            case 'PriorInsurance':
            questions = [
              {
                key: 'priorins',
                label: 'Do you currently have auto insurance?',
                options: [
                  {key: 'Y',  value: 'Yes'},
                  {key: 'YP',  value: 'Yes, I am on my Parent\'s GEICO Policy'},
                  {key: 'NI',  value: 'No, I haven\'t needed insurance'},
                  {key: 'NMR', value: 'No, my insurance ran out'},
                  {key: 'N', value: 'No, I was deployed'}
                ],
                value: drivers[0].priorinsurance.alreadyinsured,
                hint: 'Select Yes if you are an insured driver on any policy.',
                order: 5,
                type: 'dropdown'
              },
              {
                key: 'agesince',
                label: `How old were you when you got your driver's license in the US or Canada?`,
                value: drivers[0].priorinsurance.licensed_age,
                required: true,
                type: 'textbox',
                order: 6
              },
            ];
            break;
            case 'ProfessionalInfo':
            questions = [
              {
                key: 'education',
                label: 'Highest Level of Education Completed',
                options: [
                  {key: 'LTHS',  value: 'Less than High School'},
                  {key: 'V',  value: 'Vocational'},
                  {key: 'HS',  value: 'High School'},
                  {key: 'HSP',  value: 'High School, pursuing Bachelors Degree'},
                  {key: 'A',  value: 'Associate'},
                  {key: 'AP',  value: 'Associate, pursuing Bachelors Degree'},
                  {key: 'B',  value: 'Bachelors'},
                  {key: 'BG',  value: 'Bachelors, pursuing Graduate Degree'},
                  {key: 'M',  value: 'Masters'},
                  {key: 'D',  value: 'Doctors'},
                  {key: 'L',  value: 'Lawyer'},
                  {key: 'P',  value: 'Phd'},
                ],
                order: 7,
                type: 'dropdown',
                value: drivers[0].professionalInfo.education
              },
              {
                key: 'employment',
                label: 'Employment Status',
                options: [
                  {key: '01', value: 'A Private Company/Organization or Self Employed'},
                  {key: '03', value: 'Active Duty Military'},
                  {key: '02', value: 'The Federal Government or Postal Service'},
                  {key: '05', value: 'A State/Local/Municipal Government'},
                  {key: '19', value: 'I am a Full Time Student'},
                  {key: '06', value: 'I am Currently a Homemaker'},
                  {key: '07', value: 'Not Currently Employed'},
                  {key: '09', value: 'Retired Private Company/Organization or Self Employed'},
                  {key: '11', value: 'Retired Military'},
                  {key: '10', value: 'Retired Federal Government or Postal Service'},
                  {key: '13', value: 'Retired State/Local/Municipal Government'}
                ],
                order: 8,
                type: 'dropdown',
                value: drivers[0].professionalInfo.employment
              }
            ];
            break;
          }
          
          return questions.sort((a, b) => a.order - b.order);
    }
}