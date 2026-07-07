import { LightningElement, api, wire } from 'lwc';
import getPortfolioAccount from '@salesforce/apex/PortfolioController.getPortfolioAccount';

export default class MyPortfolio extends LightningElement {
    @api accountId;

    portfolio;
    hasError = false;

    introText = 'I am Avikshit Trivedi, an aspiring Software developer, I have made some projects in Python and MERN, Thankyou for visiting my portfolio';

    skills = ['Python', 'MERN Stack', 'JavaScript', 'Apex', 'Lightning Web Components'];

    projectHighlights = [
        {
            title: 'Python Projects',
            description: 'Built practical Python projects focused on clean logic, data handling, and problem solving.'
        },
        {
            title: 'MERN Applications',
            description: 'Created full-stack web apps using MongoDB, Express, React, and Node.js with responsive interfaces.'
        },
        {
            title: 'Salesforce Portfolio',
            description: 'Designed this portfolio in Salesforce using Lightning Web Components and Apex integration.'
        }
    ];

    @wire(getPortfolioAccount, { accountId: '$accountId' })
    wiredAccount({ error, data }) {
        if (data) {
            this.portfolio = data;
            this.hasError = false;
        } else if (error) {
            this.portfolio = null;
            this.hasError = true;
            console.error('PortfolioController error:', JSON.stringify(error));
        }
    }

    get noConfig() {
        return !this.accountId;
    }

    get isLoading() {
        return !!this.accountId && !this.portfolio && !this.hasError;
    }

    get initials() {
        if (!this.portfolio?.Name) return '??';
        const parts = this.portfolio.Name.trim().split(/\s+/);
        return parts.length >= 2
            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
            : parts[0].substring(0, 2).toUpperCase();
    }

    get hasLocation() {
        return !!(this.portfolio?.BillingCity || this.portfolio?.BillingCountry);
    }

    get location() {
        return [this.portfolio.BillingCity, this.portfolio.BillingCountry]
            .filter(Boolean)
            .join(', ');
    }

    get experience() {
        return this.portfolio?.NumberOfEmployees
            ? `${this.portfolio.NumberOfEmployees}+ Years`
            : '';
    }

    get phoneLink() {
        return `tel:${this.portfolio?.Phone}`;
    }

    get hasContact() {
        return !!(this.portfolio?.Phone || this.portfolio?.Website);
    }
}
