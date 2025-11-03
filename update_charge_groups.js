const fs = require('fs');
const path = require('path');

// Path to the JSON file
const filePath = path.join(process.cwd(), '/tmx-migration/rate-engine.raterecords.json');

// Read the file
try {
  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // Parse the JSON data
  let rateRecords = JSON.parse(fileContent);
  
  // ID to add to all charge profile groups
  // Old Customer Rates(Customer Charge Profile Group) = 67d112e88205a525e17e1060
  // Accessorials(Driver Charge Profile Group) = 67182274629e2aba69095cb0
  const profileGroupIdToAdd = {
    "$oid": "67d112e88205a525e17e1060"
  };
  
  // Count of records updated
  let updatedCount = 0;
  
  // Process each rate record
  rateRecords.forEach(record => {
    // Check if the record has chargeGroups
    if (record.chargeGroups && Array.isArray(record.chargeGroups)) {
      // Process each charge group
      record.chargeGroups.forEach(chargeGroup => {
        // Initialize chargeProfileGroups if it doesn't exist or isn't an array
        if (!chargeGroup.chargeProfileGroups || !Array.isArray(chargeGroup.chargeProfileGroups)) {
          chargeGroup.chargeProfileGroups = [];
        }
        
        // Check if the profile group ID already exists
        const exists = chargeGroup.chargeProfileGroups.some(group => 
          group.$oid === profileGroupIdToAdd.$oid
        );
        
        // Add the profile group ID if it doesn't exist
        if (!exists) {
          chargeGroup.chargeProfileGroups.push(profileGroupIdToAdd);
          updatedCount++;
        }
      });
    }
  });
  
  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(rateRecords, null, 2));
  
  console.log(`Successfully updated ${updatedCount} charge groups in the rate records.`);
} catch (error) {
  console.error('An error occurred:', error.message);
}
