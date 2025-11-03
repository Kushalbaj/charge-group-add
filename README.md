# Rate Records Script

Migration script to add charge profile groups to rate records JSON files.

## Overview

This project contains Node.js scripts that update rate engine records by adding charge profile group IDs to existing charge groups in JSON files.

## Scripts

### `update_charge_groups.js`
Updates the rate records file in place by adding the charge profile group ID to all charge groups that don't already have it.

**Input:** `/tmx-migration/rate-engine.raterecords.json`

### `update_charge_groups_new_file.js`
Creates a new output file with updated rate records instead of modifying the original file.

**Input:** `rate-engine-rate-records.json`  
**Output:** `rate-engine-rate-records-updated.json`

## Usage

```bash
node update_charge_groups.js
```

or

```bash
node update_charge_groups_new_file.js
```
