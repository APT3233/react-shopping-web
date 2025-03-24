import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({ onFormChange, formData }) {
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    const updatedFormData = {
      ...formData,
      [name]: newValue,
    };

    onFormChange(updatedFormData);
  };

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "This field is required";
    }
    return "";
  };

  return (
    <Grid
      container
      spacing={0}
      style={{
        display: "flex",
        gap: "20px",
        width: "100%",
        flexDirection: "row",
      }}
    >
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="firstName"
          type="text"
          placeholder="John"
          autoComplete="given-name"
          required
          size="small"
          value={formData.firstName || ""}
          onChange={handleInputChange}
          error={!!errors.firstName}
        />
        {errors.firstName && (
          <FormHelperText error>{errors.firstName}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="lastName"
          type="text"
          placeholder="Snow"
          autoComplete="family-name"
          required
          size="small"
          value={formData.lastName || ""}
          onChange={handleInputChange}
          error={!!errors.lastName}
        />
        {errors.lastName && (
          <FormHelperText error>{errors.lastName}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="phone" required>
          Phone
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="text"
          placeholder="PhoneNumber"
          autoComplete="0863844348"
          required
          size="small"
          value={formData.phone || ""}
          onChange={handleInputChange}
          error={!!errors.phone}
        />
        {errors.phone && (
          <FormHelperText error>{errors.phone}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address">Address</FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="text"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          size="small"
          value={formData.address || ""}
          onChange={handleInputChange}
          error={!!errors.address}
        />
        {errors.address && (
          <FormHelperText error>{errors.address}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="text"
          placeholder="New York"
          autoComplete="address-level2"
          required
          size="small"
          value={formData.city || ""}
          onChange={handleInputChange}
          error={!!errors.city}
        />
        {errors.city && (
          <FormHelperText error>{errors.city}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="text"
          placeholder="NY"
          autoComplete="address-level1"
          required
          size="small"
          value={formData.state || ""}
          onChange={handleInputChange}
          error={!!errors.state}
        />
        {errors.state && (
          <FormHelperText error>{errors.state}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="text"
          placeholder="12345"
          autoComplete="postal-code"
          required
          size="small"
          value={formData.zip || ""}
          onChange={handleInputChange}
          error={!!errors.zip}
        />
        {errors.zip && (
          <FormHelperText error>{errors.zip}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="text"
          placeholder="United States"
          autoComplete="country-name"
          required
          size="small"
          value={formData.country || ""}
          onChange={handleInputChange}
          error={!!errors.country}
        />
        {errors.country && (
          <FormHelperText error>{errors.country}</FormHelperText>
        )}
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={
            <Checkbox
              name="saveAddress"
              color="primary"
              checked={formData.saveAddress || false}
              onChange={handleInputChange}
            />
          }
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  );
}