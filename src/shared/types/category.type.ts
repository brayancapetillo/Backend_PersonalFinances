export interface tcategory {
  'Salary': 1
  'Investments': 1
  'Bonuses': 1
  'Reimbursements': 1
  'Other Income': 1
  'Rent/Mortgage': 2
  'water': 2
  'electricity': 2
  'gas': 2
  'Internet and Phone': 2
  'health': 2
  'home': 2
  'auto': 2
  'Loan Payments': 2
  'Food': 3
  'Transportation': 3
  'Entertainment': 3
  'Dining Out': 3
  'Clothing': 3
  'Shopping': 3
  'Emergency Savings': 4
  'Retirement Fund': 4
  'Stock Investments': 4
  'Vacation Savings': 4
  'Credit Cards': 5
  'Student Loans': 5
  'Personal Loans': 5
  'Maintenance': 6
  'Repairs': 6
  'Decoration': 6
  'Supplies': 6
  'Medical Consultations': 7
  'Medications': 7
  'Gym': 7
  'Therapy': 7
  'Tuition and Fees': 8
  'School Supplies': 8
  'Courses and Workshops': 8
  'FoodPets': 9
  'Veterinary Care': 9
  'Toys and Accessories': 9
  'Donations to NGOs': 10
  'Support to Family/Friends': 10
  'Income Taxes': 11
  'Property Taxes': 11
  'Travel': 12
  'Weekend Getaways': 12
  'Recreational Activities': 12
  'Netflix': 13
  'Disney+': 13
  'Amazon Prime Video': 13
  'HBO Max': 13
  'Apple TV+': 13
  'Hulu': 13
  'Spotify Premium': 13
  'YouTube Premium': 13
  'Paramount+': 13
  'Peacock': 13
  'Sky': 13
  'Electronic Devices': 13
  'Software and Apps': 13
}

export type tcategoryName = keyof tcategory
export type tidCategoryType = tcategory[tcategoryName]
