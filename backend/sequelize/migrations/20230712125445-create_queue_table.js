'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Queues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      searchQuery: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      laptopName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('Queues', ['searchQuery']);

    // Add a unique constraint to the 'code' column
    await queryInterface.addConstraint('Queues', {
      fields: ['searchQuery'],
      type: 'unique',
      name: 'unique_queue_search_constraint',
    });

    // Insert rows into the Queue table
    const rows = [
      {
        id: uuidv4(),
        searchQuery: 'Accountant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Acupuncture Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Addiction Treatment Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Adult Day Care Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Advertising Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'African Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Agricultural Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'AIDS Resource Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Air Conditioning Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Air Duct Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Airline',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Airport',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Alcoholism Treatment Program',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Allergist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Alternative Medicine Practitioner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ambulance Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Amusement Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Amusement Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Anesthesiologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Animal Control Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Animal Hospital',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Animal Rescue Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Animal Shelter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Antique Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Apartment Building',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Appliance Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Appliance Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Aquarium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Arabic Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Architect',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Art Gallery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Art Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Art School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Art Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Artificial Plant Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Asian Fusion Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Assisted Living Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Astrologer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'ATV Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Audiologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Audio Visual Equipment Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Audio Visual Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Auction',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Body Parts Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Body Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Dent Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Electrical Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Glass Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Insurance Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Machine Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Parts Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Radiator Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Spring Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Sunroof Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Tag Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Tune Up Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Upholsterer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Auto Wrecker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Automated Teller Machine',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Automation Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Aviation Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Awning Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baby Clothing Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baby Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bagel Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bail Bonds Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bait Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Balloon Artist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Balloon Ride Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Balloon Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Band',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Band Instrument Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bankruptcy Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bankruptcy Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Banquet Hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bar & Grill',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Barbecue Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Barber School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Barber Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bartending School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baseball Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baseball Field',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baseball Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baseball League',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Baseball Stadium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Basement Remodeler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Basketball Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Basketball Court',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Basketball Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bathroom Remodeler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bathtub Refinishing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Battery Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Battery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beach',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beach Resort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bead Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bead Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bearing Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beauty Product Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beauty Products Vending Machine',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beauty Salon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beauty School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bed & Breakfast',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bedding Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beekeeper',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beer Distributor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Beer Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bicycle Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bicycle Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bicycle Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Billiards Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bingo Hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Biofeedback Therapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Biological Products Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Biotechnology Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bird Control Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bird Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Birth Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Birth Certificate Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bistro',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Blacksmith',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Blasting Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Blinds Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Blood Bank',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Blueprint Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Board Game Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Accessories Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Cover Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Storage Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Trailer Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boat Transporter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boatyard',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Body Piercing Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Body Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boiler Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boiler Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boiler Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bolt Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Book Publisher',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Book Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Book Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bookbinder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bookkeeping Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bookmaker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boot Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bottled Water Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boutique',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bowling Alley',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Box Lunch Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boxing Gym',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Boxing Ring',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brake Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brasserie',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brazilian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Breakwater Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brewery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brewpub',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brick Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brick Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridal Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridge Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridge Construction Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridge Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridge Inspection Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridge Jumping Location',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridge Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bridging Loan Provider',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Briefing Area',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brightness Testing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'British Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'British Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Broadband Service Provider',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Broadcasting Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Brochure Printing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bronze Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bronze Sculpture',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Buddhist Temple',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Buffet Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Design Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Engineer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Equipment Hire Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Inspection Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Maintenance Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Materials Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Materials Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Society',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Building Surveyor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bungee Jumping Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bunsik Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Buoy Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Burial Ground',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Burial Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bus Charter and Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bus Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bus Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bus Stop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Bus Ticket Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business Administration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business Broker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business Development Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business Hotel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business Management Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Business to Business Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Butcher Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Butchery Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Button Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cabane à Sucre',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cabaret',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cabinet Maker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cable Car Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cable Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cable Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cable Stayed Bridge',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cable Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Café',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cajun Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cake Decorating Equipment Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cake Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Calçot Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Calderium Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Calendar Printing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Call Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Camcorder Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Camera Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Camera Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Camera Support and Stabilization Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Campground',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Camping Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Campsite',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Canadian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Canoe and Kayak Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Canoe and Kayak Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Canoeing and Kayaking Spot',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cantonese Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cape Malay Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Capsule Hotel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Alarm Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Battery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Detailing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Inspection Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Leasing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Racing Track',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Repair and Maintenance',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Stereo Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Car Wash',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Caravan Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Caravan Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carbon Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cardiologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cardiology Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cardiopulmonary Resuscitation Training',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Career Guidance Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Caribbean Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Caricature Artist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carnival Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carpenter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carpet Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carpet Installer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carpet Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carrom Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Carsharing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cartographic Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cartridge Refill Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cash and Carry Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cash Register Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Casino',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cassoulet Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cast Iron Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Casting Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Castle',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Casual Dining Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Catalonian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Catalog Showroom',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Catered Apartment',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Caterer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Catering Food and Drink Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Catholic Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cattle Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Caulking Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cave',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ceiling Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ceiling Fan Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Celebrity Impersonator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cell Phone Accessory Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cell Phone Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cell Phone Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cemetery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Central American Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Central Asian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Certified Public Accountant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Certified Translator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chabad House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chain Link Fence Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chalet Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chamber of Commerce',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Champagne Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Championship Tourist Attraction',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Championship Venue',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Charcoal Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Charcuterie Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Charity',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Charity Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Charity Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cheese Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cheesesteak Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chemical Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chemical Plant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chemical Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chess Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chess Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chevrolet Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chicken Hatchery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chicken Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chicken Wings Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Child Psychologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Childbirth Education Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Amusement Center",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Clothing Store",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Club",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Entertainer",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Furniture Store",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Museum",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Party Service",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Store",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Children's Theater",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chilean Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chimney Sweep',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chinese Herbal Medicine Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chinese Language School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chinese Medicine Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chinese Medicine Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chinese Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chinese Takeout Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chiropractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Chocolate Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christian Book Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christian Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christian College',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christian High School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christian Science Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christmas Decoration Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christmas Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Christmas Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Church of Christ',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Church of God',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Church of Jesus Christ of Latter-day Saints',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Church of the Nazarene',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Church Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cider Mill',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "City Clerk's Office",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'City Courthouse',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'City Government Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'City Hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'City Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'City Tax Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Civic Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Civil Defense Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Civil Engineer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Civil Engineering Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Classic Car Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Classic Car Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Classical Music Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Clay Target Shooting Range',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cleaners',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Climate Control System Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Climbing Gym',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Climbing Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Clinical Psychologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Clock Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Closed Circuit Television Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cloth Diaper Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Clothing Alteration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Clothing Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Clutch Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cocktail Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cocktail Ingredients Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coffee Machine Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coffee Roasters',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coffee Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coffee Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coin Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coin Operated Laundry Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coin Operated Machine Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coin Operated Washer and Dryer Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Coin-Operated Carwash',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cold Storage Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Collectibles Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'College',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'College Counseling Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'College Preparatory School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Collision Repair Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Color Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Comedy Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Comic Book Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Agent',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Artists',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Building Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Printer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Real Estate Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Real Estate Inspector',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Real Estate Renting and Leasing',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Refrigeration Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Refrigeration Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Swimming Pool Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Truck Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Vehicle Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Vehicle Inspection Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Vehicle Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Vehicle Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commercial Vehicle Storage Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Commodity Exchange',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Communication Tower',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Community Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Community College',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Community Health Centre',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Community Supported Agriculture',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Composting Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Animation Studio',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Graphics Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Security Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Software Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Support and Services',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Computer Training School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Concert Hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Concrete Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Concrete Cutting Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Concrete Pumping Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Condo Complex',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Condominium Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Confectionery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Conference Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Consignment Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Machine Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Machine Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Machine Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Material Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Project Management Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Safety Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Sand and Gravel Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Construction Surveyor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Consulate',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Consumer Electronics Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Consumer Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Contact Lens Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Container Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Contemporary Art Museum',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Convenience Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Convention Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Conveyor Belt Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cookie Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cooking Class',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cooking School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Copier Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Copy Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Corporate Campus',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Corporate Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Corporate Retreat Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cosmetic Dentist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cosmetic Products Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cosmetics Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Costume Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cottage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Counseling Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Country Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'County Courthouse',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Courier Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Court Reporter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Courthouse',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Crane Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Crane Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Crane Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Credit Counseling Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Credit Reporting Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cremation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Creperie',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cricket Ground',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Crisis Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Crocodile Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cruise Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cruise Line Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cruises',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cuban Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Culinary School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cultural Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cupcake Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Currency Exchange Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Curry Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Curtain Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Custom Home Builder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Custom Label Printer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Custom T-shirt Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Customs Broker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cutlery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'CV Joint Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Cycle Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dairy Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dairy Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dance Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dance Hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dance School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dance Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dancing Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Danish Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Data Recovery Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Day Care Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Day Spa',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Deck Builder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Defense Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Deli',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Delivery Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Demolition Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dental Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dental Hygienist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dental Implants Periodontist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dental Insurance Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dental Laboratory',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dental School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dental Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dentist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Denture Care Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Department Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dermatologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Design School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dessert Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Diabetes Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Diagnostic Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dialysis Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Diamond Buyer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Diamond Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Diamond Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Diaper Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dietitian',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dim Sum Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Diner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dinner Theater',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Direct Mail Advertising',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Disabilities Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Disabled Sports Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Disc Golf Course',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Disciples of Christ Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Disco Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Discount Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Distillery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Divorce Lawyer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dj Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'DJ Training School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dock Builder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Doctor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dog Breeder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dog Hostel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dog Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dog Sitter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dog Trainer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dog Walker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Doll Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Doll Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dominican Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Donations Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Donut Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Door Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dormitory',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dot Com Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Double Glazing Installer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Doughnut Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Draperies & Curtains Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dress Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dressmaker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Drilling Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Drive-In Movie Theater',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Drive-Thru Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Driving Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Driving Range',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Drug Addiction Treatment Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Drug Testing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Drum Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dry Cleaner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dry Ice Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dry Wall Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dry Wall Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Duct Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dump Truck Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dumpster Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dutch Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'DVD Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Dyslexia Tutoring Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'E-commerce Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ear Piercing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Early Childhood Education Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Eastern European Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Eating Disorder Treatment Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Eco Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Eclectic Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Economic Development Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ecuadorian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Editorial Services',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Educational Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Educational Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Egyptian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electric Motor Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electric Motor Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electric Utility Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electric Vehicle Charging Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electrical Appliance Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electrical Installation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electrical Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electrolysis Hair Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electronic Parts Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electronics Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electronics Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Electronics Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Elementary School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Elevator Installation & Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Elevator Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Embassy',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Embroidery Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Emergency Care Physician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Emergency Dental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Emergency Lighting Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Emergency Locksmith Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Emergency Management Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Emergency Room',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Emergency Training School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Employment Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Employment Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Employment Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Employment Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Endocrinologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Endodontist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Energy Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Energy Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Engine Rebuilding Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Engineering Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Engineering School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Engraving Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Entertainer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Entertainment Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Environmental Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Environmental Engineer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Environmental Health Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Environmental Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Equipment Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ergonomics Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Escape Room Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Escort Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Estate Appraiser',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Estate Liquidator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Estate Planning Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ethnic Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Event Management Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Event Planner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Event Ticket Seller',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Excavating Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Executive Search Firm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Exercise Equipment Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Exhaust System Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Exterminator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Eye Care Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Eyeglass Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Eyewear Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fabric Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Facial Spa',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Factory Outlet Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Family Counselor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Family Law Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Family Planning Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Family Practice Physician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Farm Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Farmers' Market",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fashion Accessories Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fashion Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fashion Design School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fast Food Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fence Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fertility Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fertilizer Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fiber Optic Cable Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fiberglass Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Figurine Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Filipino Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Film Production Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Filter Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Financial Planner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fine Dining Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fire Damage Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fire Protection Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fireplace Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Firewood Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fireworks Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'First Aid Kit Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fish & Chips Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fish Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fish Hatchery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fish Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fish Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fishing Charter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fishing Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fishing Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fitness Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fitness Equipment Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Flag Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Flea Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Flight School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Floor Refinishing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Floor Sanding and Polishing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Flooring Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Flooring Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Florist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Foam Rubber Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Folk Art Museum',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fondue Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Bank',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Court',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Delivery Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Processing Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Products Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Stand',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Food Truck',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Foot Care Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Foot Massage Parlor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Football Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Foreclosure Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Forest',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Forestry Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Forklift Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Forklift Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Formal Wear Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Foster Care Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Foundation',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fountain Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fountain Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fragrance Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Franchising Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Free Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Free Parking Area',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Freezing Plant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'French Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fried Chicken Takeaway',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fried Rice Takeaway',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Friend of the Court',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Frieze Art Fair',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Frozen Dessert Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Frozen Dessert Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Frozen Food Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fruit and Vegetable Processing Plant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fruit and Vegetable Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fuel Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fuel Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fulfillment Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Full-Service Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Funeral Home',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fur Coat Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Fur Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Furniture Maker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Furniture Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Furniture Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Furniture Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Furniture Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Futon Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Futsal Court',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Futsal Field',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Futsal Stadium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gambling Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gambling Lawyer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gambling Rehab Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Game Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Builder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Door Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Door Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Door Installation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Door Opener Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Door Opener Installation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Floor Coating Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Organizer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garage Sale',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Machinery Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Pond Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Shredder Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Sprinkler System Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Garden Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gardening Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gardening Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gas Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gas Cylinder Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gas Installation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gas Logs Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gas Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gastroenterologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gated Community',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gay Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gay Sauna',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gemologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'General Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'General Hospital',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'General Practice Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'General Register Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'General Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Generator Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Genetic Counselor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Geriatrician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'German Bakery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'German Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gift Basket Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gift Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gingerbread House Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Block Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Blower',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Cutting Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Engraver',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Etching Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glass Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glassware Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glassware Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glazier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Glider Plane School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gliding Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gluten-Free Bakery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gluten-Free Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gold Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gold Prospecting Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Cart Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Course',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Course Builder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Driving Range',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Equipment Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Resort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Golf Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gondola Ride Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Government Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Government Office Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Government Relations Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Government Trade Commission Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Grab Hire Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Grain Elevator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Granite Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Graphic Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Graphic Designer Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Greek Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Green Grocer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Greenhouse',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Greenhouse Builder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Greeting Card Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Greyhound Stadium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Grocery Delivery Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Groundwater Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Group Accommodation',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Group Home',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Guard Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Guardrail Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Guest House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Guild Hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Guitar Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Guitar Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gun Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gun Range',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gun Safety Training Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gun Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gunsmith',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gutter Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gutter Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gutter Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gym',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gymnastics Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Gyrotonic Studio',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hair Extensions Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hair Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hair Replacement Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hair Salon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hairdresser Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Haitian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Halal Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Halfway House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ham Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hamburger Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hand Surgeon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handbag Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handbag Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handicapped Transportation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handicraft',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handicraft Exporter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handicraft Importer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handicraft Product Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handicraft Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handloom',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handmade Furniture Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handmade Home Goods Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Handmade Jewelry Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hang Glider Training Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hang-Gliding Area',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Harbor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hard Rock Cafe',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hardwood Floor Refinishing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hardwood Flooring Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hardware Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hat Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Haunted House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hawaiian Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hawaiian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hay Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Health and Beauty Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Health Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Health Food Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Health Food Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Health Resort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hearing Aid Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hearing Aid Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heart Hospital',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heating Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heating Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heating Oil Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heating System Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heating System Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heavy Equipment Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heavy Equipment Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heavy Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heavy Hauling Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Heavy Towing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Helicopter Charter Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Helicopter Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hemp Products Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Herbal Medicine Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School Athletic Field',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School Band',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School Basketball Court',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School Football Field',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School Soccer Field',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School Track',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High School Volleyball Court',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'High-Speed Internet Service Provider',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Highway Patrol Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hindu Temple',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Historic Landmark',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Historic Preservation Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Historic Site',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Historical Place',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Historical Society',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Historical Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hobby Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hockey Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hockey Rink',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hockey Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Holistic Medicine Practitioner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Automation Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Builder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Cinema Installer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Health Care Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Health Care Service Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Improvement Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Inspector',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Insurance Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Home Theater Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Homebrew Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Homemade Food Delivery Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Honda Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Honey Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hookah Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horse Boarding Stable',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horse Breeder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horse Carriage Ride Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horse Riding School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horse Trailer Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horse Trainer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horseback Riding Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Horticulture Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hospice',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hospital',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hospital Equipment and Supplies Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hostel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hot Dog Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hot Spring',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hot Tub Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hot Tub Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hot Water System Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hotel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hotel Management Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hotel Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'House Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'House Sitter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Houseboat Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Housing Authority',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Housing Cooperative',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Human Resource Consulting Firm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Human Rights Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hungarian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hunting and Fishing Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hunting Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hunting Preserve',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hydraulic Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hydraulic Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hydraulic Tools Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hydroponics Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hypnotherapy Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Hyundai Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ice Cream Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ice Cream Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ice Skating Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ice Skating Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ice Skating Rink',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Icelandic Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ignition Interlock Device Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'IKO Roofing Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Imaging Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Immigration Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Immigration Detention Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Importer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Inbound Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Incense Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Indian Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Indian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Indoor Cycling Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Indoor Golf Course',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Indoor Playground',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Indoor Ski Resort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Chemicals Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Design Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Door Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Engineer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Gas Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Heating Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Hygiene Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Land Development Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Industrial Vacuum Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Infectious Disease Physician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Infertility Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Information Bureau',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Information Retrieval Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Information Technology Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Inhalation Therapy Practitioner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Injection Molding Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Inn',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Insect Control Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Insecticides Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Installation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Instant Printing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Instructional Materials Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Instrumentation Engineer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Insulation Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Insulation Materials Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Insurance Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Insurance Broker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Insurance School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Integrated Circuit Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Intellectual Property Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Intellectual Property Registry',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Interior Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Interior Door Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Interior Plant Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'International Airport',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'International Trade Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Internet Cafe',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Internet Marketing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Internet Service Provider',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Interpretation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Investment Bank',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Investment Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Investment Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Irish Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Irish Pub',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Iron Works',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Irrigation Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Italian Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Italian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'IT Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'IT Security Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Janitorial Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Janitorial Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Japanese Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Japanese Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jazz Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Jehovah's Witness Church",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jeweler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewelry Appraiser',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewelry Buyer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewelry Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewelry Engraver',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewelry Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewelry Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewelry Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewish Cemetery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jewish Synagogue',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Juice Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Jujitsu School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Junkyard',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Karaoke Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Karaoke Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Karate School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kennel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kerosene Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Key Duplication Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Keychain Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kickboxing School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kidney Dialysis Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kitchen Remodeler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kitchen Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kite Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Knitting Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Korean Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Korean Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kosher Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Kosher Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Labeling Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Laboratory Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Laboratory Testing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Labrador Retriever Breeder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lake',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Land Planning Services',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Land Surveyor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Landscape Architect',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Landscape Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Landscape Lighting Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Language School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Laser Cutting Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Laser Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Laser Hair Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Laser Tag Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Latin American Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Latin American Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Laundry Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Law Firm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lawn Care Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lawn Equipment Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lawn Irrigation Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lawn Sprinkler System Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lead Generation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Leather Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lebanese Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lebanese Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Legal Services',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Leisure Centre',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Library',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'License Bureau',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'License Plate Frames Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Licensing Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Life Coach',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Life Insurance Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lighting Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lighting Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lighting Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lighting Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lighting Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Limousine Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Linen Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Linens Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lingerie Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Livestock Auction House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Livestock Breeder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Livestock Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Livestock Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Livestock Feeder Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Livestock Producer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Livestock Transport Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Loan Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Loan Broker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Loan Modification Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Lock Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Locksmith',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Loft Conversion Specialist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Logistics Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Machine Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Machine Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Machine Tool Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Machinery Parts Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Magician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Maid Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mailbox Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mailing Machine Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Make-Up Artist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Malaysian Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Malaysian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Management Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Management School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mandap Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Marble Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Marble Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Marine Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Market Researcher',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Marketing Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Marketing Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Marketing School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Marriage Counselor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Martial Arts School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Masonry Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Massage School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Massage Spa',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Massage Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Maternity Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mattress Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mattress Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Meadery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Meal Delivery Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Meal Takeaway',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Meat Processor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Meat Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Media and Communication Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mediation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Billing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Equipment Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Equipment Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Group',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Laboratory',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Spa',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Medical Transcription Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Meditation Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mediterranean Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mediterranean Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Men's Clothing Store",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Men's Hair Salon",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Men's Health Clinic",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Men's Store",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mental Health Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mental Health Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Metal Detecting Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Metal Fabricator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Metal Finishing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Metal Heat Treating Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Metal Polishing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Metal Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mexican Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mexican Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Middle Eastern Grocery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Middle Eastern Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Midwife',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Military Base',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Military School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Milk Delivery Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Millwork Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Miniature Golf Course',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mining Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mirror Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Miscellaneous Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Billboard Advertising Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Crane Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Home Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Home Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Home Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Home Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Notary',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Phone Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Phone Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mobile Veterinarian',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Model Design Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Modeling Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Modern Art Museum',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mold Inspection Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mold Remediation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mold Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Monastery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Money Order Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Money Transfer Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mongolian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Monument Maker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mortgage Broker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mortgage Lender',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Driving School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Insurance Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Training Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motivational Speaker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motor Scooter Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motor Vehicle Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motor Vehicle Registration Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motor Vehicle Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motor Vehicle Valuation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorbike Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorhome Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorhome Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorhome Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Motorcycle and Scooter Parking Area',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Moulding Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Muffler Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Mulch Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Multimedia and Electronic Book Publisher',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Multimedia and Electronic Book Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Multimedia and Electronic Book Subscription Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Municipal Engineer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Municipal Government Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Municipal Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Municipal Recycling Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Municipal Sports Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Municipal Sports Stadium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Murals Artist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Museum',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Museum of Archaeology',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Museum of Art',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Museum of Natural History',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music Box Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music Management and Promotion',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music Producer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music Production Studio',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Music Venue',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Musical Instrument Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Musical Instrument Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Musical Instrument Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Musical Instrument Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Musical Theater',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Nanny Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Natural Foods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Natural Gas Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Natural Health Products Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Natural History Museum',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Naturopathic Medicine Practitioner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Navy',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Necktie Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Needlework Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Neon Sign Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Nephrologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Neurologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Neurosurgeon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'New Age Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'New Car Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'News Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Newsstand',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Newspaper Advertising Department',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Newspaper Publisher',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Night Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Night Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Night Safari',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Noodle Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Notary Public',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Nurseries and Greenhouses',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Nursery School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Nursing Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Nursing Home',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Nutritionist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Obstetrician-Gynecologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Occupational Health Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Occupational Therapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Office Equipment Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Office Furniture Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Office Space Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Office Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ophthalmologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Optical Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Optician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Optometrist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Orchid Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Organic Drug Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Organic Food Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Organic Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Organizational Psychologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Oriental Medicine Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Orphanage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Orthodontist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Orthopedic Shoe Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Orthopedic Surgeon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Orthotics & Prosthetics Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Osteopath',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Outdoor Clothing Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Outdoor Furniture Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Outdoor Sports Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Outlet Mall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Outlet Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Oven Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Packaging Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Paddleboarding Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Paint Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Paint Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Painter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Palaeontologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Paper Distributor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Paper Mill',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Paragliding Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Paramedic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Parasailing Ride Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Parenting Counselor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Parking Garage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Parking Lot',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Passport Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Patio Enclosure Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Patio Furniture Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pawn Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Payphone',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pediatric Dentist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pediatrician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Peking Duck Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pen Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pension Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pentecostal Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Percussion Instrument Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Periodontist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Permanent Makeup Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Persian Carpet Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Personal Chef',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Personal Injury Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Personal Trainer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pest Control Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pet Adoption Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pet Cemetery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pet Groomer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pet Sitter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pet Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pet Training Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Petting Zoo',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pharmaceutical Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pharmacist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pharmacy',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Phone Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Photo Lab',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Photocopier Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Photographer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Photography School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Physical Fitness Program',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Physical Therapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Physician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Piano Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Piano Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Piano Moving Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Picture Frame Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Piercing Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pilates Studio',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pipe Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pizza Delivery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pizza Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plant Nursery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plasterer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plastic Bag Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plastic Fabrication Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plastic Injection Molding Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plastic Surgeon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Playground',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plumber',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Plumbing Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Podiatrist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Police Department',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Polish Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Political Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pond Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pool Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pool Hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pool Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Popcorn Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Portuguese Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Post Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Poultry Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Powder Coating Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Power Plant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Preschool',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pressure Washing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pretzel Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Printer Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Printing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Private Investigator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Private School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Probate Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Process Server',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Produce Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Product Design Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Professional Organizer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Project Management Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Promotional Products Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Property Management Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Psychiatric Hospital',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Psychiatrist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Psychic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Psychoanalyst',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Psychotherapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Public Relations Firm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Public Swimming Pool',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Public Notary',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Public Relations Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Public Transit Line',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Publisher',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Publishing Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pulmonologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Pump Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Quilt Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'RV Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Racecourse',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Racing Car Parts Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Radiator Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Radiologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Raft Trip Outfitter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Railroad Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Railway Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ranch',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Real Estate Agents',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Real Estate Appraiser',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Real Estate Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Real Estate Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Recording Studio',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Recycling Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Reflexologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Refrigerator Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rehabilitation Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Religious Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Religious Institution',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Religious Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Research Foundation',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Residential Construction Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Residential Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Resort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Restaurant Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Retirement Community',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Retirement Home',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rheumatologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Roadside Assistance Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rock Climbing Gym',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Roofing Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Roofing Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Roommate Referral Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rubbish Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'RV Storage Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Race Car Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Race Track',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Racing Car Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Racquetball Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Railway Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ranch Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Real Estate Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Real Estate Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Real Estate Developer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Record Label',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Recreational Vehicle Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Recreational Vehicle Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Religious Bookstore',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Religious School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Remodeler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rendering Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Renovation Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Repo Auction',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Research Institute',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Research Laboratory',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Residential Building',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Residential Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Residential Estate',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Residential Homebuilder',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Residential Treatment Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Respiratory Therapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rib Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rice Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Riding School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Road Construction Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rock Climbing Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rock Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Roller Skating Rink',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ropes Course',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rotisserie Chicken Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rowing Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rubbish Dump',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Rugby Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Running Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Russian Orthodox Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'RV Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'RV Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'RV Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Safety Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Saigon Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Salad Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Salsa Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Salvage Yard',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sandblasting Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sandwich Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sanitation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Santoku Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sausage Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sauna',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Scaffolding Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Scale Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Scandinavian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Scenic Spot',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'School Bus Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'School District Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'School Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Science Museum',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Scuba Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Seafood Market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Seafood Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Seafood Wholesale',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Self Defense School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Self-Service Car Wash',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Self-Storage Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Senior Citizen Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Serbian Orthodox Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Serviced Apartment Building',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sewing Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sewing Machine Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sewing Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sex Therapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Share House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sheet Metal Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shipping and Mailing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shipyard',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shoe Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shoe Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shooting Range',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shopping Mall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shredding Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shrimp Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shrub Nursery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Shutter Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Siberian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sign Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sikh Temple',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Silk Plant Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Silverware Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Skate Sharpening Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Skate Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Skating Rink',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ski Lodge',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ski Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ski Resort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ski School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Skin Care Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Skydiving Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sledding Hill',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sleep Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sleepwear Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Slushie Machine Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Small Appliance Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Small Claims Assistance Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Small Plates Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Smart Home Automation Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Smog Inspection Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Smoke Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Smokehouse',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Smoothie Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Snack Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Snorkeling Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Snow Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Snowboard Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Snowmobile Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Social Security Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Social Security Office',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Social Services Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sock Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Software Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar Energy Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar Energy Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar Hot Water System Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar Installation Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar Photovoltaic System Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar Power Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar Power Plant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Solar System Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Souvenir Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Spa',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Spanish Language School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Spanish Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Spay and Neuter Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Special Education School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Specialty Food Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Specialty School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Speech Pathologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Speed Dating Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Spice Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sporting Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Card Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Complex',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Medicine Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Memorabilia Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Nutrition Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sports Training Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Spray Foam Insulation Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Spring Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sprinkler Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sprinkler System Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sprinkler System Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Squash Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stables',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stadium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stained Glass Studio',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stair Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stair Lift Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stamp Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stationery Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Steak House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Steam Room Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Steel Distributor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Steel Drum Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Steel Fabricator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Steel Frame Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Steel Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stenographer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Step Stool Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stockbroker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stone Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stonemason',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Storage Facility',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Storm Shutter Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Storm Water Drainage Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stormwater Management Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Street Sweeper Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Structural Engineer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Structural Steel Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Stucco Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Student Accommodation Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Student Housing Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Subaru Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Suede Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sugar Mill',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sugaring Hair Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sunroom Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Supermarket',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Supplement Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Surgeon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Surgical Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Surgical Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Surveyor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Sushi Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Suzuki Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Swim Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Swim School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Swim Spa Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Swimming Pool Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Swimming Pool Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Swimming Pool Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Swimwear Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Synagogue',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'T-Shirt Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Table and Chair Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Table Tennis Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Taco Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tailor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Taiwanese Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Takeout Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Talent Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tanning Salon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tapas Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tattoo Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tattoo Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tax Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Taxi Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tea House',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tea Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tearoom',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Technical School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Telecommunications Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Telecommunications Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Telecommunications Service Provider',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Telecommunications Tower',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Telemarketing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Telephone Answering Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Television Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Television Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Temp Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tempura Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tennis Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tennis Court',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tennis Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tennis Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tent Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Thai Massage Therapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Thai Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Thatched Cottage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Theatrical Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Theme Park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Therapeutic Massage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Thrift Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tibetan Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tile Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tile Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Timber Merchants',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Time and Attendance Software Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tire Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Title Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tobacco Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tofu Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tomato Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tour Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tour Operator',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tourist Attraction',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tourist Information Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tower Crane Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Townhouse Complex',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Toy Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Toyota Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Toyota Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Track Field Stadium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tractor Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tractor Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tractor Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trade School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trading Card Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Traditional Chinese Medicine Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Traffic Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Traffic School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trailer Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trailer Hitch Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trailer Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trailer Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trailer Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Train Ticket Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Train Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trainee Recruitment Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Transcription Service Provider',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Transmission Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Transport Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Transportation Escort Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Transportation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Travel Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Travel Medicine Clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tree Farm',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tree Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tree Stump Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trenching Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trichologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Truck Accessories Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Truck Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Truck Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Truck Repair Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Truck Stop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trucking Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trucking School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trucking Transportation Broker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trucking Warehouse',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Truffle Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Trust and Estate Attorney',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tube Well Drilling Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tugboat Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tuning Automobile',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tunnel Construction Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Turbocharger Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Turkish Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Turntable Manufacturer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tutoring Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'TV Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'TV Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'TV Station Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tuxedo Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Typewriter Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Typing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Typographic Design Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tyre Retreading Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tyre Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Tyre Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Ultrasound Imaging Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Unemployment Insurance Consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Uniform Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Unitarian Universalist Church',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'University',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Upholstery Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Upholstery Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Urban Planning Department',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Urgent Care Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Appliance Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Bicycle Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Bookstore',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Car Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used CD Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Clothing Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Computer Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Furniture Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Musical Instrument Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Office Furniture Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Sporting Goods Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Tire Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Truck Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Used Video Game Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Utility Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vacuum Cleaner Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vacuum Cleaner Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Valet Parking Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Van Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vape Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Variety Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vascular Surgeon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vehicle Inspection Station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vehicle Shipping Agent',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vehicle Signage Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vehicle Testing Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vending Machine Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Venetian Blind Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Venetian Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Veterinarian',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Veterinary Pharmacy',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Veterinary Radiologist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Veterinary Referral Hospital',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Veterinary Surgeon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vietnamese Restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Villa Rental Agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vinyl Fence Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vinyl Records Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vinyl Siding Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Violin Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Virtual Reality Arcade',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vitamins & Supplements Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Vocational School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Voice Over Artist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Volleyball Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Volvo Dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wallpaper Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Warehouse Club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Warehouse Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Watch Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Watch Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Damage Restoration Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Heater Installation & Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Purification Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Ski Shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Skiing Instructor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Softening Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Testing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Treatment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Water Utility Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Waterproofing Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Waxing Hair Removal Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Web Hosting Company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Web Traffic School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Website Designer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wedding Bakery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wedding Boutique',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wedding Chapel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wedding Photographer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wedding Planner',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wedding Videographer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Weight Loss Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Welding Gas Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Welding Supply Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Well Drilling Contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wellness Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wheelchair Rental Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wheelchair Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wheelchair Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wholesale Bakery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wholesale Florist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wholesale Grocer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wholesale Plant Nursery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wholesale Seafood Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wigs and Hairpieces Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wildlife Refuge',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Window Cleaning Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Window Installation Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Window Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Window Tinting Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Window Treatment Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Windshield Repair Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wine Bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wine Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Winery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Women's Clothing Store",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Women's Health Clinic",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: "Women's Shelter",
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Work Clothes Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Workplace Safety Equipment Supplier',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Wrestling School',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Writing Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'X-ray Imaging Service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Yacht Broker',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Yarn Store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Yoga Studio',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Youth Center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Youth Organization',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Zipline',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Zoo',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'Zoological Garden',
        laptopName: '',
      },
    ];
    const googleTypes = [
      {
        id: uuidv4(),
        searchQuery: 'american_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'bakery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'bar',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'barbecue_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'brazilian_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'breakfast_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'brunch_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'cafe',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'chinese_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'coffee_shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'fast_food_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'french_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'greek_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hamburger_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'ice_cream_shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'indian_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'indonesian_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'italian_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'japanese_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'korean_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'lebanese_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'meal_delivery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'meal_takeaway',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'mediterranean_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'mexican_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'middle_eastern_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'pizza_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'ramen_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'sandwich_shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'seafood_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'spanish_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'steak_house',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'sushi_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'thai_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'turkish_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'vegan_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'vegetarian_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'vietnamese_restaurant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'auto_parts_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'bicycle_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'book_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'cell_phone_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'clothing_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'convenience_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'department_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'discount_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'electronics_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'furniture_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'gift_shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'grocery_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hardware_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'home_goods_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'home_improvement_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'jewelry_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'liquor_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'market',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'pet_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'shoe_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'shopping_mall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'sporting_goods_store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'store',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'supermarket',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'wholesaler',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'barber_shop',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'beauty_salon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'cemetery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'child_care_agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'consultant',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'courier_service',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'electrician',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'florist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'funeral_home',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hair_care',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hair_salon',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'insurance_agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'laundry',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'lawyer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'locksmith',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'moving_company',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'painter',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'plumber',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'real_estate_agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'roofing_contractor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'storage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'tailor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'telecommunications_service_provider',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'travel_agency',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'veterinary_care',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'amusement_center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'amusement_park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'aquarium',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'banquet_hall',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'bowling_alley',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'casino',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'community_center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'convention_center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'cultural_center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'dog_park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'event_venue',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hiking_area',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'historical_landmark',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'marina',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'movie_rental',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'movie_theater',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'national_park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'night_club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'tourist_attraction',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'visitor_center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'wedding_venue',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'zoo',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'library',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'preschool',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'primary_school',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'school',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'secondary_school',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'university',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'dental_clinic',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'dentist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'doctor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'drugstore',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hospital',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'medical_lab',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'pharmacy',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'physiotherapist',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'spa',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'bed_and_breakfast',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'campground',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'camping_cabin',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'cottage',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'extended_stay_hotel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'farmstay',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'guest_house',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hostel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'hotel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'lodging',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'motel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'private_guest_room',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'resort_hotel',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'rv_park',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'athletic_field',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'fitness_center',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'golf_course',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'gym',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'playground',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'ski_resort',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'sports_club',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'sports_complex',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'stadium',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'swimming_pool',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'airport',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'bus_station',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'bus_stop',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'ferry_terminal',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'heliport',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'light_rail_station',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'park_and_ride',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'subway_station',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'taxi_stand',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'train_station',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'transit_depot',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'transit_station',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'truck_stop',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'city_hall',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'courthouse',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'embassy',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'fire_station',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'local_government_office',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'police',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'post_office',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'accounting',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'atm',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'bank',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'car_dealer',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'car_rental',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'car_repair',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'car_wash',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'electric_vehicle_charging_station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'gas_station',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'parking',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'rest_stop',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'church',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'hindu_temple',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'mosque',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'synagogue',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'administrative_area_level_1',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'administrative_area_level_2',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'country',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'locality',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'postal_code',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'school_district',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'art_gallery',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'museum',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'performing_arts_theater',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'farm',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'administrative_area_level_3',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'administrative_area_level_4',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'administrative_area_level_5',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'administrative_area_level_6',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'administrative_area_level_7',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'archipelago',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'colloquial_area',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'continent',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'establishment',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'floor',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'food',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'general_contractor',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'geocode',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'health',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'intersection',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'landmark',
        laptopName: '',
      },
      {
        id: uuidv4(),
        searchQuery: 'natural_feature',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'neighborhood',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'place_of_worship',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'plus_code',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'point_of_interest',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'political',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'post_box',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'postal_code_prefix',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'postal_code_suffix',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'postal_town',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'premise',
      //   laptopName: '',
      // },
      {
        id: uuidv4(),
        searchQuery: 'room',
        laptopName: '',
      },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'route',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'street_address',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'street_number',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'sublocality',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'sublocality_level_1',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'sublocality_level_2',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'sublocality_level_3',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'sublocality_level_4',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'sublocality_level_5',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'subpremise',
      //   laptopName: '',
      // },
      // {
      //   id: uuidv4(),
      //   searchQuery: 'town_square',
      //   laptopName: '',
      // },
    ];

    await queryInterface.bulkInsert('Queues', googleTypes);
  },

  down: async (queryInterface, Sequelize) => {
    // Drop indexes
    await queryInterface.removeIndex('Queues', ['searchQuery']);
    // Drop foreign key constraints with custom name
    await queryInterface.removeConstraint('Queues', 'unique_queue_search_constraint');

    // Drop the table
    await queryInterface.dropTable('Queues');
  },
};
