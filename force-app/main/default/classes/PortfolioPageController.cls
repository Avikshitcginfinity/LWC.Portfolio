public with sharing class PortfolioPageController {
    public Account account { get; private set; }

    public PortfolioPageController() {
        String accountIdParam = ApexPages.currentPage().getParameters().get('id');
        if (String.isBlank(accountIdParam)) {
            return;
        }

        Id accountId;
        try {
            accountId = (Id) accountIdParam;
        } catch (Exception ex) {
            return;
        }

        List<Account> accounts = [
            SELECT Id, Name, Site, Description, Industry, Type,
                   NumberOfEmployees, Phone, Website,
                   BillingCity, BillingCountry
            FROM Account
            WHERE Id = :accountId
            WITH USER_MODE
            LIMIT 1
        ];

        if (!accounts.isEmpty()) {
            account = accounts[0];
        }
    }

    public Boolean getHasAccount() {
        return account != null;
    }

    public String getInitials() {
        if (account == null || String.isBlank(account.Name)) {
            return '??';
        }

        List<String> parts = account.Name.trim().split('\\s+');
        if (parts.size() >= 2) {
            return (parts[0].substring(0, 1) + parts[parts.size() - 1].substring(0, 1)).toUpperCase();
        }

        return account.Name.substring(0, Math.min(2, account.Name.length())).toUpperCase();
    }

    public Boolean getHasLocation() {
        return account != null && (!String.isBlank(account.BillingCity) || !String.isBlank(account.BillingCountry));
    }

    public String getLocation() {
        if (!getHasLocation()) {
            return '';
        }

        List<String> locationParts = new List<String>();
        if (!String.isBlank(account.BillingCity)) {
            locationParts.add(account.BillingCity);
        }
        if (!String.isBlank(account.BillingCountry)) {
            locationParts.add(account.BillingCountry);
        }

        return String.join(locationParts, ', ');
    }

    public Boolean getHasExperience() {
        return account != null && account.NumberOfEmployees != null;
    }

    public String getExperience() {
        return getHasExperience() ? String.valueOf(account.NumberOfEmployees) + '+ Years' : '';
    }

    public Boolean getHasContact() {
        return account != null && (!String.isBlank(account.Phone) || !String.isBlank(account.Website));
    }
}
