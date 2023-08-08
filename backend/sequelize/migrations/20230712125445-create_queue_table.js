'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Queues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'), // Generate UUIDs automatically
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
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
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
        searchQuery: 'Accountant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Acupuncture Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Addiction Treatment Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Adult Day Care Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Advertising Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'African Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Agricultural Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'AIDS Resource Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Air Conditioning Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Air Duct Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Airline',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Airport',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Alcoholism Treatment Program',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Allergist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Alternative Medicine Practitioner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ambulance Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Amusement Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Amusement Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Anesthesiologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Animal Control Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Animal Hospital',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Animal Rescue Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Animal Shelter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Antique Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Apartment Building',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Appliance Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Appliance Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Aquarium',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Arabic Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Architect',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Art Gallery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Art Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Art School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Art Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Artificial Plant Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Asian Fusion Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Assisted Living Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Astrologer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'ATV Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Audiologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Audio Visual Equipment Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Audio Visual Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Auction',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Body Parts Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Body Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Dent Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Electrical Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Glass Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Insurance Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Machine Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Parts Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Radiator Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Spring Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Sunroof Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Tag Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Tune Up Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Upholsterer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Auto Wrecker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Automated Teller Machine',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Automation Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Aviation Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Awning Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baby Clothing Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baby Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bagel Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bail Bonds Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bait Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Balloon Artist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Balloon Ride Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Balloon Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Band',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Band Instrument Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bankruptcy Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bankruptcy Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Banquet Hall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bar & Grill',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Barbecue Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Barber School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Barber Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bartending School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baseball Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baseball Field',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baseball Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baseball League',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Baseball Stadium',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Basement Remodeler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Basketball Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Basketball Court',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Basketball Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bathroom Remodeler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bathtub Refinishing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Battery Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Battery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beach',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beach Resort',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bead Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bead Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bearing Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beauty Product Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beauty Products Vending Machine',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beauty Salon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beauty School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bed & Breakfast',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bedding Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beekeeper',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beer Distributor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Beer Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bicycle Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bicycle Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bicycle Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Billiards Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bingo Hall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Biofeedback Therapist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Biological Products Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Biotechnology Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bird Control Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bird Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Birth Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Birth Certificate Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bistro',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Blacksmith',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Blasting Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Blinds Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Blood Bank',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Blueprint Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Board Game Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Accessories Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Cover Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Storage Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Trailer Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boat Transporter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boatyard',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Body Piercing Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Body Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boiler Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boiler Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boiler Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bolt Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Book Publisher',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Book Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Book Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bookbinder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bookkeeping Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bookmaker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boot Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bottled Water Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boutique',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bowling Alley',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Box Lunch Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boxing Gym',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Boxing Ring',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brake Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brasserie',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brazilian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Breakwater Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brewery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brewpub',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brick Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brick Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridal Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridge Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridge Construction Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridge Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridge Inspection Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridge Jumping Location',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridge Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bridging Loan Provider',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Briefing Area',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brightness Testing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'British Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'British Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Broadband Service Provider',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Broadcasting Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Brochure Printing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bronze Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bronze Sculpture',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Buddhist Temple',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Buffet Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Design Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Engineer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Equipment Hire Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Inspection Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Maintenance Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Materials Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Materials Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Society',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Building Surveyor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bungee Jumping Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bunsik Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Buoy Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Burial Ground',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Burial Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bus Charter and Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bus Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bus Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bus Stop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Bus Ticket Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business Administration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business Broker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business Development Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business Hotel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business Management Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Business to Business Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Butcher Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Butchery Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Button Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cabane à Sucre',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cabaret',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cabinet Maker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cable Car Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cable Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cable Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cable Stayed Bridge',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cable Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Café',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cajun Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cake Decorating Equipment Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cake Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Calçot Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Calderium Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Calendar Printing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Call Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Camcorder Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Camera Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Camera Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Camera Support and Stabilization Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Campground',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Camping Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Campsite',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Canadian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Canoe and Kayak Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Canoe and Kayak Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Canoeing and Kayaking Spot',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cantonese Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cape Malay Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Capsule Hotel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Alarm Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Battery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Detailing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Inspection Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Leasing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Racing Track',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Repair and Maintenance',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Stereo Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Car Wash',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Caravan Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Caravan Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carbon Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cardiologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cardiology Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cardiopulmonary Resuscitation Training',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Career Guidance Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Caribbean Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Caricature Artist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carnival Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carpenter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carpet Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carpet Installer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carpet Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carrom Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Carsharing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cartographic Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cartridge Refill Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cash and Carry Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cash Register Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Casino',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cassoulet Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cast Iron Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Casting Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Castle',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Casual Dining Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Catalonian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Catalog Showroom',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Catered Apartment',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Caterer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Catering Food and Drink Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Catholic Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cattle Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Caulking Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cave',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ceiling Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ceiling Fan Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Celebrity Impersonator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cell Phone Accessory Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cell Phone Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cell Phone Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cemetery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Central American Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Central Asian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Certified Public Accountant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Certified Translator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chabad House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chain Link Fence Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chalet Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chamber of Commerce',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Champagne Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Championship Tourist Attraction',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Championship Venue',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Charcoal Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Charcuterie Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Charity',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Charity Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Charity Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cheese Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cheesesteak Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chemical Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chemical Plant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chemical Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chess Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chess Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chevrolet Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chicken Hatchery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chicken Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chicken Wings Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Child Psychologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Childbirth Education Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Amusement Center",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Clothing Store",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Club",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Entertainer",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Furniture Store",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Museum",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Party Service",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Store",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Children's Theater",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chilean Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chimney Sweep',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chinese Herbal Medicine Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chinese Language School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chinese Medicine Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chinese Medicine Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chinese Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chinese Takeout Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chiropractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Chocolate Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christian Book Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christian Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christian College',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christian High School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christian Science Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christmas Decoration Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christmas Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Christmas Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Church of Christ',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Church of God',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Church of Jesus Christ of Latter-day Saints',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Church of the Nazarene',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Church Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cider Mill',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "City Clerk's Office",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'City Courthouse',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'City Government Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'City Hall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'City Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'City Tax Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Civic Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Civil Defense Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Civil Engineer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Civil Engineering Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Classic Car Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Classic Car Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Classical Music Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Clay Target Shooting Range',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cleaners',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Climate Control System Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Climbing Gym',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Climbing Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Clinical Psychologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Clock Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Closed Circuit Television Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cloth Diaper Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Clothing Alteration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Clothing Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Clutch Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cocktail Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cocktail Ingredients Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coffee Machine Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coffee Roasters',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coffee Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coffee Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coin Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coin Operated Laundry Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coin Operated Machine Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coin Operated Washer and Dryer Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Coin-Operated Carwash',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cold Storage Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Collectibles Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'College',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'College Counseling Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'College Preparatory School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Collision Repair Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Color Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Comedy Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Comic Book Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Agent',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Artists',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Building Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Printer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Real Estate Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Real Estate Inspector',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Real Estate Renting and Leasing',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Refrigeration Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Refrigeration Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Swimming Pool Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Truck Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Vehicle Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Vehicle Inspection Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Vehicle Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Vehicle Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commercial Vehicle Storage Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Commodity Exchange',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Communication Tower',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Community Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Community College',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Community Health Centre',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Community Supported Agriculture',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Composting Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Animation Studio',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Graphics Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Security Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Software Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Support and Services',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Computer Training School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Concert Hall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Concrete Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Concrete Cutting Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Concrete Pumping Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Condo Complex',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Condominium Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Confectionery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Conference Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Consignment Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Machine Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Machine Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Machine Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Material Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Project Management Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Safety Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Sand and Gravel Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Construction Surveyor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Consulate',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Consumer Electronics Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Consumer Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Contact Lens Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Container Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Contemporary Art Museum',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Convenience Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Convention Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Conveyor Belt Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cookie Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cooking Class',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cooking School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Copier Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Copy Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Corporate Campus',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Corporate Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Corporate Retreat Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cosmetic Dentist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cosmetic Products Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cosmetics Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Costume Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cottage',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Counseling Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Country Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'County Courthouse',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Courier Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Court Reporter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Courthouse',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Crane Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Crane Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Crane Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Credit Counseling Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Credit Reporting Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cremation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Creperie',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cricket Ground',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Crisis Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Crocodile Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cruise Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cruise Line Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cruises',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cuban Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Culinary School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cultural Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cupcake Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Currency Exchange Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Curry Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Curtain Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Custom Home Builder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Custom Label Printer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Custom T-shirt Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Customs Broker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cutlery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'CV Joint Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Cycle Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dairy Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dairy Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dance Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dance Hall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dance School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dance Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dancing Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Danish Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Data Recovery Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Day Care Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Day Spa',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Deck Builder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Defense Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Deli',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Delivery Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Demolition Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dental Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dental Hygienist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dental Implants Periodontist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dental Insurance Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dental Laboratory',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dental School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dental Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dentist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Denture Care Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Department Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dermatologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Design School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dessert Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Diabetes Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Diagnostic Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dialysis Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Diamond Buyer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Diamond Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Diamond Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Diaper Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dietitian',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dim Sum Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Diner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dinner Theater',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Direct Mail Advertising',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Disabilities Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Disabled Sports Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Disc Golf Course',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Disciples of Christ Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Disco Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Discount Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Distillery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Divorce Lawyer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dj Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'DJ Training School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dock Builder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Doctor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dog Breeder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dog Hostel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dog Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dog Sitter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dog Trainer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dog Walker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Doll Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Doll Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dominican Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Donations Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Donut Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Door Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dormitory',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dot Com Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Double Glazing Installer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Doughnut Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Draperies & Curtains Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dress Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dressmaker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Drilling Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Drive-In Movie Theater',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Drive-Thru Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Driving Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Driving Range',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Drug Addiction Treatment Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Drug Testing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Drum Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dry Cleaner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dry Ice Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dry Wall Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dry Wall Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Duct Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dump Truck Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dumpster Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dutch Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'DVD Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Dyslexia Tutoring Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'E-commerce Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ear Piercing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Early Childhood Education Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Eastern European Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Eating Disorder Treatment Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Eco Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Eclectic Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Economic Development Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ecuadorian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Editorial Services',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Educational Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Educational Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Egyptian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electric Motor Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electric Motor Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electric Utility Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electric Vehicle Charging Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electrical Appliance Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electrical Installation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electrical Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electrolysis Hair Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electronic Parts Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electronics Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electronics Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Electronics Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Elementary School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Elevator Installation & Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Elevator Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Embassy',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Embroidery Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Emergency Care Physician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Emergency Dental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Emergency Lighting Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Emergency Locksmith Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Emergency Management Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Emergency Room',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Emergency Training School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Employment Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Employment Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Employment Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Employment Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Endocrinologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Endodontist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Energy Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Energy Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Engine Rebuilding Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Engineering Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Engineering School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Engraving Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Entertainer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Entertainment Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Environmental Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Environmental Engineer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Environmental Health Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Environmental Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Equipment Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ergonomics Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Escape Room Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Escort Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Estate Appraiser',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Estate Liquidator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Estate Planning Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ethnic Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Event Management Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Event Planner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Event Ticket Seller',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Excavating Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Executive Search Firm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Exercise Equipment Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Exhaust System Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Exterminator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Eye Care Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Eyeglass Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Eyewear Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fabric Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Facial Spa',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Factory Outlet Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Family Counselor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Family Law Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Family Planning Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Family Practice Physician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Farm Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Farmers' Market",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fashion Accessories Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fashion Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fashion Design School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fast Food Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fence Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fertility Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fertilizer Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fiber Optic Cable Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fiberglass Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Figurine Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Filipino Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Film Production Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Filter Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Financial Planner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fine Dining Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fire Damage Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fire Protection Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fireplace Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Firewood Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fireworks Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'First Aid Kit Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fish & Chips Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fish Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fish Hatchery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fish Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fish Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fishing Charter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fishing Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fishing Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fitness Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fitness Equipment Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Flag Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Flea Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Flight School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Floor Refinishing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Floor Sanding and Polishing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Flooring Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Flooring Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Florist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Foam Rubber Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Folk Art Museum',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fondue Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Bank',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Court',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Delivery Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Processing Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Products Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Stand',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Food Truck',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Foot Care Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Foot Massage Parlor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Football Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Foreclosure Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Forest',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Forestry Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Forklift Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Forklift Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Formal Wear Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fort',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Foster Care Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Foundation',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fountain Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fountain Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fragrance Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Franchising Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Free Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Free Parking Area',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Freezing Plant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'French Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fried Chicken Takeaway',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fried Rice Takeaway',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Friend of the Court',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Frieze Art Fair',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Frozen Dessert Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Frozen Dessert Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Frozen Food Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fruit and Vegetable Processing Plant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fruit and Vegetable Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fuel Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fuel Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fulfillment Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Full-Service Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Funeral Home',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fur Coat Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Fur Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Furniture Maker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Furniture Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Furniture Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Furniture Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Furniture Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Futon Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Futsal Court',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Futsal Field',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Futsal Stadium',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gambling Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gambling Lawyer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gambling Rehab Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Game Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Builder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Door Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Door Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Door Installation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Door Opener Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Door Opener Installation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Floor Coating Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Organizer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garage Sale',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Machinery Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Pond Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Shredder Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Sprinkler System Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Garden Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gardening Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gardening Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gas Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gas Cylinder Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gas Installation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gas Logs Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gas Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gastroenterologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gated Community',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gay Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gay Sauna',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gemologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'General Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'General Hospital',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'General Practice Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'General Register Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'General Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Generator Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Genetic Counselor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Geriatrician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'German Bakery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'German Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gift Basket Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gift Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gingerbread House Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Block Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Blower',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Cutting Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Engraver',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Etching Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glass Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glassware Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glassware Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glazier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Glider Plane School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gliding Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gluten-Free Bakery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gluten-Free Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gold Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gold Prospecting Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Cart Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Course',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Course Builder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Driving Range',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Equipment Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Resort',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Golf Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gondola Ride Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Government Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Government Office Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Government Relations Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Government Trade Commission Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Grab Hire Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Grain Elevator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Granite Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Graphic Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Graphic Designer Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Greek Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Green Grocer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Greenhouse',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Greenhouse Builder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Greeting Card Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Greyhound Stadium',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Grocery Delivery Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Groundwater Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Group Accommodation',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Group Home',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Guard Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Guardrail Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Guest House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Guild Hall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Guitar Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Guitar Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gun Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gun Range',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gun Safety Training Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gun Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gunsmith',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gutter Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gutter Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gutter Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gym',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gymnastics Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Gyrotonic Studio',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hair Extensions Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hair Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hair Replacement Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hair Salon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hairdresser Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Haitian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Halal Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Halfway House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ham Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hamburger Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hand Surgeon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handbag Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handbag Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handicapped Transportation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handicraft',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handicraft Exporter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handicraft Importer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handicraft Product Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handicraft Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handloom',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handmade Furniture Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handmade Home Goods Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Handmade Jewelry Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hang Glider Training Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hang-Gliding Area',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Harbor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hard Rock Cafe',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hardwood Floor Refinishing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hardwood Flooring Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hardware Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hat Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Haunted House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hawaiian Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hawaiian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hay Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Health and Beauty Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Health Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Health Food Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Health Food Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Health Resort',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hearing Aid Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hearing Aid Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heart Hospital',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heating Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heating Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heating Oil Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heating System Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heating System Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heavy Equipment Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heavy Equipment Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heavy Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heavy Hauling Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Heavy Towing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Helicopter Charter Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Helicopter Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hemp Products Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Herbal Medicine Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School Athletic Field',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School Band',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School Basketball Court',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School Football Field',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School Soccer Field',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School Track',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High School Volleyball Court',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'High-Speed Internet Service Provider',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Highway Patrol Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hindu Temple',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Historic Landmark',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Historic Preservation Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Historic Site',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Historical Place',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Historical Society',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Historical Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hobby Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hockey Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hockey Rink',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hockey Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Holistic Medicine Practitioner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Automation Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Builder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Cinema Installer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Health Care Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Health Care Service Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Improvement Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Inspector',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Insurance Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Home Theater Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Homebrew Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Homemade Food Delivery Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Honda Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Honey Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hookah Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horse Boarding Stable',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horse Breeder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horse Carriage Ride Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horse Riding School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horse Trailer Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horse Trainer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horseback Riding Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Horticulture Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hospice',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hospital',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hospital Equipment and Supplies Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hostel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hot Dog Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hot Spring',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hot Tub Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hot Tub Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hot Water System Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hotel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hotel Management Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hotel Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'House Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'House Sitter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Houseboat Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Housing Authority',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Housing Cooperative',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Human Resource Consulting Firm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Human Rights Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hungarian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hunting and Fishing Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hunting Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hunting Preserve',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hydraulic Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hydraulic Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hydraulic Tools Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hydroponics Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hypnotherapy Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Hyundai Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ice Cream Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ice Cream Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ice Skating Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ice Skating Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ice Skating Rink',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Icelandic Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ignition Interlock Device Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'IKO Roofing Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Imaging Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Immigration Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Immigration Detention Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Importer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Inbound Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Incense Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Indian Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Indian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Indoor Cycling Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Indoor Golf Course',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Indoor Playground',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Indoor Ski Resort',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Chemicals Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Design Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Door Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Engineer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Gas Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Heating Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Hygiene Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Land Development Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Industrial Vacuum Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Infectious Disease Physician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Infertility Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Information Bureau',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Information Retrieval Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Information Technology Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Inhalation Therapy Practitioner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Injection Molding Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Inn',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Insect Control Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Insecticides Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Installation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Instant Printing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Instructional Materials Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Instrumentation Engineer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Insulation Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Insulation Materials Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Insurance Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Insurance Broker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Insurance School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Integrated Circuit Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Intellectual Property Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Intellectual Property Registry',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Interior Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Interior Door Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Interior Plant Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'International Airport',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'International Trade Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Internet Cafe',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Internet Marketing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Internet Service Provider',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Interpretation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Investment Bank',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Investment Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Investment Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Irish Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Irish Pub',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Iron Works',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Irrigation Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Italian Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Italian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'IT Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'IT Security Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Janitorial Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Janitorial Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Japanese Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Japanese Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jazz Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Jehovah's Witness Church",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jeweler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewelry Appraiser',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewelry Buyer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewelry Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewelry Engraver',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewelry Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewelry Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewelry Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewish Cemetery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jewish Synagogue',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Juice Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Jujitsu School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Junkyard',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Karaoke Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Karaoke Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Karate School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kennel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kerosene Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Key Duplication Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Keychain Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kickboxing School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kidney Dialysis Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kitchen Remodeler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kitchen Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kite Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Knitting Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Korean Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Korean Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kosher Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Kosher Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Labeling Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Laboratory Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Laboratory Testing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Labrador Retriever Breeder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lake',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Land Planning Services',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Land Surveyor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Landscape Architect',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Landscape Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Landscape Lighting Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Language School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Laser Cutting Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Laser Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Laser Hair Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Laser Tag Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Latin American Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Latin American Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Laundry Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Law Firm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lawn Care Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lawn Equipment Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lawn Irrigation Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lawn Sprinkler System Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lead Generation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Leather Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lebanese Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lebanese Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Legal Services',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Leisure Centre',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Library',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'License Bureau',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'License Plate Frames Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Licensing Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Life Coach',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Life Insurance Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lighting Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lighting Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lighting Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lighting Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lighting Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Limousine Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Linen Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Linens Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lingerie Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Livestock Auction House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Livestock Breeder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Livestock Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Livestock Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Livestock Feeder Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Livestock Producer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Livestock Transport Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Loan Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Loan Broker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Loan Modification Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Lock Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Locksmith',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Loft Conversion Specialist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Logistics Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Machine Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Machine Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Machine Tool Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Machinery Parts Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Magician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Maid Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mailbox Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mailing Machine Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Make-Up Artist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Malaysian Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Malaysian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Management Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Management School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mandap Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Marble Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Marble Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Marine Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Market Researcher',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Marketing Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Marketing Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Marketing School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Marriage Counselor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Martial Arts School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Masonry Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Massage School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Massage Spa',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Massage Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Maternity Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mattress Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mattress Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Meadery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Meal Delivery Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Meal Takeaway',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Meat Processor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Meat Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Media and Communication Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mediation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Billing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Equipment Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Equipment Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Group',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Laboratory',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Spa',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Medical Transcription Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Meditation Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mediterranean Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mediterranean Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Men's Clothing Store",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Men's Hair Salon",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Men's Health Clinic",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Men's Store",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mental Health Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mental Health Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Metal Detecting Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Metal Fabricator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Metal Finishing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Metal Heat Treating Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Metal Polishing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Metal Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mexican Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mexican Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Middle Eastern Grocery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Middle Eastern Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Midwife',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Military Base',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Military School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Milk Delivery Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Millwork Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Miniature Golf Course',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mining Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mirror Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Miscellaneous Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Billboard Advertising Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Crane Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Home Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Home Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Home Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Home Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Notary',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Phone Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Phone Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mobile Veterinarian',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Model Design Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Modeling Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Modern Art Museum',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mold Inspection Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mold Remediation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mold Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Monastery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Money Order Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Money Transfer Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mongolian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Monument Maker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mortgage Broker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mortgage Lender',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Driving School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Insurance Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Training Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motivational Speaker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motor Scooter Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motor Vehicle Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motor Vehicle Registration Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motor Vehicle Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motor Vehicle Valuation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorbike Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorhome Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorhome Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorhome Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Motorcycle and Scooter Parking Area',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Moulding Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Muffler Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Mulch Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Multimedia and Electronic Book Publisher',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Multimedia and Electronic Book Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Multimedia and Electronic Book Subscription Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Municipal Engineer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Municipal Government Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Municipal Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Municipal Recycling Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Municipal Sports Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Municipal Sports Stadium',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Murals Artist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Museum',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Museum of Archaeology',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Museum of Art',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Museum of Natural History',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music Box Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music Management and Promotion',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music Producer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music Production Studio',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Music Venue',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Musical Instrument Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Musical Instrument Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Musical Instrument Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Musical Instrument Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Musical Theater',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Nanny Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Natural Foods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Natural Gas Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Natural Health Products Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Natural History Museum',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Naturopathic Medicine Practitioner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Navy',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Necktie Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Needlework Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Neon Sign Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Nephrologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Neurologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Neurosurgeon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'New Age Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'New Car Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'News Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Newsstand',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Newspaper Advertising Department',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Newspaper Publisher',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Night Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Night Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Night Safari',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Noodle Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Notary Public',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Nurseries and Greenhouses',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Nursery School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Nursing Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Nursing Home',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Nutritionist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Obstetrician-Gynecologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Occupational Health Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Occupational Therapist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Office Equipment Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Office Furniture Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Office Space Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Office Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ophthalmologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Optical Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Optician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Optometrist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Orchid Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Organic Drug Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Organic Food Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Organic Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Organizational Psychologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Oriental Medicine Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Orphanage',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Orthodontist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Orthopedic Shoe Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Orthopedic Surgeon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Orthotics & Prosthetics Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Osteopath',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Outdoor Clothing Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Outdoor Furniture Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Outdoor Sports Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Outlet Mall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Outlet Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Oven Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Packaging Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Paddleboarding Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Paint Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Paint Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Painter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Palaeontologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Paper Distributor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Paper Mill',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Paragliding Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Paramedic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Parasailing Ride Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Parenting Counselor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Parking Garage',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Parking Lot',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Passport Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Patio Enclosure Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Patio Furniture Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pawn Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Payphone',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pediatric Dentist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pediatrician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Peking Duck Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pen Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pension Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pentecostal Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Percussion Instrument Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Periodontist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Permanent Makeup Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Persian Carpet Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Personal Chef',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Personal Injury Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Personal Trainer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pest Control Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pet Adoption Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pet Cemetery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pet Groomer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pet Sitter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pet Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pet Training Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Petting Zoo',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pharmaceutical Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pharmacist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pharmacy',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Phone Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Photo Lab',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Photocopier Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Photographer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Photography School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Physical Fitness Program',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Physical Therapist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Physician',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Piano Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Piano Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Piano Moving Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Picture Frame Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Piercing Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pilates Studio',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pipe Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pizza Delivery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pizza Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plant Nursery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plasterer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plastic Bag Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plastic Fabrication Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plastic Injection Molding Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plastic Surgeon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Playground',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plumber',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Plumbing Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Podiatrist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Police Department',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Polish Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Political Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pond Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pool Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pool Hall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pool Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Popcorn Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Portuguese Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Post Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Poultry Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Powder Coating Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Power Plant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Preschool',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pressure Washing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pretzel Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Printer Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Printing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Private Investigator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Private School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Probate Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Process Server',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Produce Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Product Design Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Professional Organizer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Project Management Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Promotional Products Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Property Management Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Psychiatric Hospital',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Psychiatrist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Psychic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Psychoanalyst',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Psychotherapist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Public Relations Firm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Public Swimming Pool',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Public Notary',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Public Relations Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Public Transit Line',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Publisher',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Publishing Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pulmonologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Pump Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Quilt Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'RV Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Racecourse',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Racing Car Parts Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Radiator Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Radiologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Raft Trip Outfitter',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Railroad Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Railway Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ranch',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Real Estate Agents',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Real Estate Appraiser',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Real Estate Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Real Estate Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Recording Studio',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Recycling Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Reflexologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Refrigerator Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rehabilitation Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Religious Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Religious Institution',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Religious Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Research Foundation',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Residential Construction Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Residential Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Resort',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Restaurant Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Retirement Community',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Retirement Home',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rheumatologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Roadside Assistance Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rock Climbing Gym',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Roofing Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Roofing Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Roommate Referral Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rubbish Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'RV Storage Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Race Car Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Race Track',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Racing Car Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Racquetball Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Railway Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ranch Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Real Estate Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Real Estate Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Real Estate Developer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Record Label',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Recreational Vehicle Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Recreational Vehicle Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Religious Bookstore',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Religious School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Remodeler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rendering Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Renovation Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Repo Auction',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Research Institute',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Research Laboratory',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Residential Building',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Residential Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Residential Estate',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Residential Homebuilder',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Residential Treatment Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Respiratory Therapist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rib Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rice Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Riding School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Road Construction Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rock Climbing Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rock Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Roller Skating Rink',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ropes Course',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rotisserie Chicken Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rowing Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rubbish Dump',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Rugby Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Running Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Russian Orthodox Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'RV Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'RV Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'RV Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Safety Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Saigon Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Salad Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Salsa Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Salvage Yard',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sandblasting Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sandwich Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sanitation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Santoku Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sausage Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sauna',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Scaffolding Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Scale Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Scandinavian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Scenic Spot',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'School Bus Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'School District Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'School Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Science Museum',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Scuba Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Seafood Market',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Seafood Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Seafood Wholesale',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Self Defense School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Self-Service Car Wash',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Self-Storage Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Senior Citizen Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Serbian Orthodox Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Serviced Apartment Building',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sewing Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sewing Machine Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sewing Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sex Therapist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Share House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sheet Metal Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shipping and Mailing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shipyard',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shoe Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shoe Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shooting Range',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shopping Mall',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shredding Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shrimp Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shrub Nursery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Shutter Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Siberian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sign Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sikh Temple',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Silk Plant Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Silverware Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Skate Sharpening Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Skate Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Skating Rink',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ski Lodge',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ski Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ski Resort',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ski School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Skin Care Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Skydiving Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sledding Hill',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sleep Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sleepwear Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Slushie Machine Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Small Appliance Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Small Claims Assistance Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Small Plates Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Smart Home Automation Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Smog Inspection Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Smoke Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Smokehouse',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Smoothie Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Snack Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Snorkeling Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Snow Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Snowboard Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Snowmobile Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Social Security Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Social Security Office',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Social Services Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sock Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Software Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar Energy Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar Energy Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar Hot Water System Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar Installation Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar Photovoltaic System Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar Power Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar Power Plant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Solar System Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Souvenir Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Spa',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Spanish Language School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Spanish Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Spay and Neuter Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Special Education School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Specialty Food Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Specialty School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Speech Pathologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Speed Dating Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Spice Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sporting Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Card Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Complex',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Medicine Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Memorabilia Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Nutrition Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sports Training Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Spray Foam Insulation Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Spring Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sprinkler Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sprinkler System Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sprinkler System Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Squash Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stables',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stadium',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stained Glass Studio',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stair Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stair Lift Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stamp Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stationery Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Steak House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Steam Room Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Steel Distributor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Steel Drum Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Steel Fabricator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Steel Frame Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Steel Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stenographer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Step Stool Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stockbroker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stone Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stonemason',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Storage Facility',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Storm Shutter Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Storm Water Drainage Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stormwater Management Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Street Sweeper Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Structural Engineer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Structural Steel Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Stucco Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Student Accommodation Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Student Housing Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Subaru Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Suede Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sugar Mill',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sugaring Hair Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sunroom Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Supermarket',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Supplement Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Surgeon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Surgical Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Surgical Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Surveyor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Sushi Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Suzuki Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Swim Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Swim School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Swim Spa Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Swimming Pool Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Swimming Pool Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Swimming Pool Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Swimwear Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Synagogue',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'T-Shirt Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Table and Chair Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Table Tennis Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Taco Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tailor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Taiwanese Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Takeout Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Talent Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tanning Salon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tapas Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tattoo Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tattoo Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tax Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Taxi Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tea House',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tea Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tearoom',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Technical School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Telecommunications Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Telecommunications Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Telecommunications Service Provider',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Telecommunications Tower',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Telemarketing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Telephone Answering Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Television Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Television Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Temp Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tempura Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tennis Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tennis Court',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tennis Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tennis Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tent Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Thai Massage Therapist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Thai Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Thatched Cottage',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Theatrical Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Theme Park',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Therapeutic Massage',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Thrift Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tibetan Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tile Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tile Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Timber Merchants',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Time and Attendance Software Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tire Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Title Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tobacco Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tofu Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tomato Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tour Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tour Operator',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tourist Attraction',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tourist Information Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tower Crane Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Townhouse Complex',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Toy Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Toyota Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Toyota Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Track Field Stadium',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tractor Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tractor Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tractor Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trade School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trading Card Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Traditional Chinese Medicine Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Traffic Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Traffic School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trailer Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trailer Hitch Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trailer Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trailer Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trailer Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Train Ticket Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Train Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trainee Recruitment Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Transcription Service Provider',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Transmission Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Transport Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Transportation Escort Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Transportation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Travel Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Travel Medicine Clinic',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tree Farm',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tree Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tree Stump Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trenching Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trichologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Truck Accessories Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Truck Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Truck Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Truck Repair Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Truck Stop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trucking Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trucking School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trucking Transportation Broker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trucking Warehouse',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Truffle Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Trust and Estate Attorney',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tube Well Drilling Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tugboat Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tuning Automobile',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tunnel Construction Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Turbocharger Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Turkish Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Turntable Manufacturer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tutoring Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'TV Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'TV Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'TV Station Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tuxedo Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Typewriter Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Typing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Typographic Design Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tyre Retreading Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tyre Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Tyre Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Ultrasound Imaging Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Unemployment Insurance Consultant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Uniform Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Unitarian Universalist Church',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'University',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Upholstery Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Upholstery Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Urban Planning Department',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Urgent Care Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Appliance Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Bicycle Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Bookstore',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Car Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used CD Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Clothing Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Computer Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Furniture Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Musical Instrument Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Office Furniture Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Sporting Goods Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Tire Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Truck Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Used Video Game Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Utility Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vacuum Cleaner Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vacuum Cleaner Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Valet Parking Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Van Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vape Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Variety Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vascular Surgeon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vehicle Inspection Station',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vehicle Shipping Agent',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vehicle Signage Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vehicle Testing Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vending Machine Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Venetian Blind Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Venetian Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Veterinarian',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Veterinary Pharmacy',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Veterinary Radiologist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Veterinary Referral Hospital',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Veterinary Surgeon',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vietnamese Restaurant',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Villa Rental Agency',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vinyl Fence Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vinyl Records Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vinyl Siding Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Violin Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Virtual Reality Arcade',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vitamins & Supplements Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Vocational School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Voice Over Artist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Volleyball Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Volvo Dealer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wallpaper Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Warehouse Club',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Warehouse Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Watch Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Watch Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Damage Restoration Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Heater Installation & Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Purification Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Ski Shop',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Skiing Instructor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Softening Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Testing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Treatment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Water Utility Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Waterproofing Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Waxing Hair Removal Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Web Hosting Company',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Web Traffic School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Website Designer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wedding Bakery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wedding Boutique',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wedding Chapel',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wedding Photographer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wedding Planner',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wedding Videographer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Weight Loss Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Welding Gas Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Welding Supply Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Well Drilling Contractor',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wellness Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wheelchair Rental Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wheelchair Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wheelchair Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wholesaler',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wholesale Bakery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wholesale Florist',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wholesale Grocer',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wholesale Plant Nursery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wholesale Seafood Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wigs and Hairpieces Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wildlife Refuge',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Window Cleaning Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Window Installation Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Window Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Window Tinting Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Window Treatment Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Windshield Repair Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wine Bar',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wine Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Winery',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Women's Clothing Store",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Women's Health Clinic",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: "Women's Shelter",
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Work Clothes Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Workplace Safety Equipment Supplier',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Wrestling School',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Writing Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'X-ray Imaging Service',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Yacht Broker',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Yarn Store',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Yoga Studio',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Youth Center',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Youth Organization',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Zipline',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Zoo',
        laptopName: '',
        status: 'Pending',
      },
      {
        searchQuery: 'Zoological Garden',
        laptopName: '',
        status: 'Pending',
      },
    ];

    await queryInterface.bulkInsert('Queues', rows);
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
