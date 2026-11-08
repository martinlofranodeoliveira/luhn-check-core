# Design — luhn-check-core

Standard Luhn: from the rightmost digit, double every second digit,
subtract 9 above 9, sum; valid iff sum mod 10 is 0. Check-digit
generation appends a placeholder `0`, then takes `(10 - sum % 10) % 10`.

Oracle: textbook numbers (79927398713, Amex, Visa test, IMEI) plus
round-trips — every generated digit must validate. No card semantics:
any digit string is just a string.
