// Paper Viewer

class PapersViewer {
    constructor() {
        this.allPapersData = [];
        this.filteredData = [];
        this.sortColumn = null;
        this.sortDirection = 'asc';

        // Default visible columns
        this.visibleColumns = new Set([
            'Paper ID',
            'Paper Title',
            'Citation',
            'Year',
            'Publication Type',
            'Source',
            'Motivation',
            'Technology',
            'Domain',
            'Methods',
            'Target Groups',
            'Values',
            'Future Direction',
            'Download'
        ]);

        this.init();
    }

    async init() {
        await this.loadPapers();
        this.renderTable();
    }

    async loadPapers() {
        try {
            const response = await fetch('paperlist.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            this.allPapersData = d3.csvParse(text);
            this.filteredData = [...this.allPapersData];
        } catch (error) {
            console.error('Error loading papers:', error);
            this.allPapersData = [];
            this.filteredData = [];
        }
    }

    getReadableColumnName(col) {
        const nameMap = {
            'Paper ID': 'Paper ID',
            'Paper Title': 'Paper Title',
            'Citation': 'Citation',
            'Year': 'Year',
            'Publication Type': 'Publication Type',
            'Source': 'Source',
            'Motivation': 'Motivation',
            'Technology': 'Technology',
            'Domain': 'Domain',
            'Methods': 'Methods',
            'Target Groups': 'Target Groups',
            'Values': 'Values',
            'Future Direction': 'Future Direction',
            'Download': 'Download',
            'URL': 'URL',
            'Moral': 'Moral Values',
            'Individual': 'Individual Values',
            'Social': 'Social Values',
            'Exploring Impact': 'Exploring Impact',
            'Broadening Coverage': 'Broadening Coverage',
            'Improving Methods': 'Improving Methods',
            'Not Specified': 'Not Specified'
        };
        return nameMap[col] || col;
    }

    getUniqueValues(column) {
        return [...new Set(this.allPapersData.map(row => row[column]))].filter(v => v).sort();
    }

    renderTable() {
        const container = document.querySelector('#papers-container');
        if (!container) return;

        // Get unique values for filters
        const uniquePapers = this.getUniqueValues('Paper ID');
        const uniqueYear = this.getUniqueValues('Year');
        const uniquePubType = this.getUniqueValues('Publication Type');
        const uniqueSource = this.getUniqueValues('Source');
        const uniqueMotivation = this.getUniqueValues('Motivation');
        const uniqueTechnology = this.getUniqueValues('Technology');
        const uniqueDomain = this.getUniqueValues('Domain');
        const uniqueMethods = this.getUniqueValues('Methods');
        const uniqueTargetGroups = this.getUniqueValues('Target Groups');
        const uniqueValues = this.getUniqueValues('Values');
        const uniqueFutureDirection = this.getUniqueValues('Future Direction');

        container.innerHTML = `
            <div class="table-header">
                <h2>Papers <span class="paper-count">(${this.filteredData.length} of ${this.allPapersData.length} papers)</span></h2>
                
                <div class="filters">
                    <div class="filter-grid">
                        <div class="filter-item">
                            <label for="search-all">Search All</label>
                            <input type="text" id="search-all" placeholder="Type to search...">
                        </div>
                        
                        <div class="filter-item">
                            <label for="filter-paper">Paper ID</label>
                            <select id="filter-paper">
                                <option value="">All Papers</option>
                                ${uniquePapers.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-item">
                            <label for="filter-year">Year</label>
                            <select id="filter-year">
                                <option value="">All Years</option>
                                ${uniqueYear.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-item">
                            <label for="filter-pubtype">Publication Type</label>
                            <select id="filter-pubtype">
                                <option value="">All Publication Types</option>
                                ${uniquePubType.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-item">
                            <label for="filter-source">Source</label>
                            <select id="filter-source">
                                <option value="">All Sources</option>
                                ${uniqueSource.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-item">
                            <label for="filter-motivation">Motivation</label>
                            <select id="filter-motivation">
                                <option value="">All Motivations</option>
                                ${uniqueMotivation.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-item">
                            <label for="filter-technology">Technology</label>
                            <select id="filter-technology">
                                <option value="">All Technologies</option>
                                ${uniqueTechnology.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>

                        <div class="filter-item">
                            <label for="filter-domain">Domain</label>
                            <select id="filter-domain">
                                <option value="">All Domains</option>
                                ${uniqueDomain.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="filter-item">
                            <label for="filter-methods">Methods</label>
                            <select id="filter-methods">
                                <option value="">All Methods</option>
                                ${uniqueMethods.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>

                        <div class="filter-item">
                            <label for="filter-targetgroups">Target Groups</label>
                            <select id="filter-targetgroups">
                                <option value="">All Target Groups</option>
                                ${uniqueTargetGroups.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>

                        <div class="filter-item">
                            <label for="filter-values">Values</label>
                            <select id="filter-values">
                                <option value="">All Values</option>
                                ${uniqueValues.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>

                        <div class="filter-item">
                            <label for="filter-futuredirection">Future Direction</label>
                            <select id="filter-futuredirection">
                                <option value="">All Future Directions</option>
                                ${uniqueFutureDirection.map(val => `<option value="${val}">${val}</option>`).join('')}
                            </select>
                        </div>
                        
                    </div>
                    
                    <div class="filter-actions">
                        <button id="clear-filters" class="btn btn-danger">Clear All Filters</button>
                    </div>
                </div>
            </div>
            
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            ${Array.from(this.visibleColumns).map(col => {
            const displayName = this.getReadableColumnName(col);
            return `<th>${displayName}</th>`;
        }).join('')}
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        ${this.generateTableRows()}
                    </tbody>
                </table>
            </div>
        `;

        this.attachEventListeners();
    }

    generateTableRows() {
        if (this.filteredData.length === 0) {
            return `<tr><td colspan="${this.visibleColumns.size}" class="no-results">No papers found matching filters...</td></tr>`;
        }

        return this.filteredData.map((row, index) => `
            <tr class="${index % 2 === 0 ? 'row-even' : 'row-odd'}">
                ${Array.from(this.visibleColumns).map(col => {
            // Handle Download column specially
            if (col === 'Download') {
                const paperId = row['Paper ID'] || '';
                if (paperId) {
                    return `<td><a href="papers/${paperId}.pdf" download class="download-link">PDF</a></td>`;
                }
                return `<td>—</td>`;
            }

            const value = row[col] || '';
            const title = ['Citation', 'Source'].includes(col)
                ? `title="${value.toString().replace(/"/g, '&quot;')}"` : '';
            return `<td ${title}>${value}</td>`;
        }).join('')}
            </tr>
        `).join('');
    }

    attachEventListeners() {
        // Search input with debouncing
        const searchInput = document.getElementById('search-all');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => this.applyFilters(), 300);
            });
        }

        // Filter dropdowns
        ['filter-paper', 'filter-year', 'filter-pubtype', 'filter-source', 'filter-motivation', 'filter-technology', 'filter-domain', 'filter-methods', 'filter-targetgroups', 'filter-values', 'filter-futuredirection'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => this.applyFilters());
        });

        // Clear filters button
        document.getElementById('clear-filters')?.addEventListener('click', () => this.clearFilters());
    }

    applyFilters() {
        const searchTerm = document.getElementById('search-all')?.value.toLowerCase() || '';
        const paperFilter = document.getElementById('filter-paper')?.value || '';
        const yearFilter = document.getElementById('filter-year')?.value || '';
        const pubtypeFilter = document.getElementById('filter-pubtype')?.value || '';
        const sourceFilter = document.getElementById('filter-source')?.value || '';
        const motivationFilter = document.getElementById('filter-motivation')?.value || '';
        const technologyFilter = document.getElementById('filter-technology')?.value || '';
        const domainFilter = document.getElementById('filter-domain')?.value || '';
        const methodsFilter = document.getElementById('filter-methods')?.value || '';
        const targetgroupsFilter = document.getElementById('filter-targetgroups')?.value || '';
        const valuesFilter = document.getElementById('filter-values')?.value || '';
        const futuredirectionFilter = document.getElementById('filter-futuredirection')?.value || '';

        this.filteredData = this.allPapersData.filter(row => {
            // Search all columns
            if (searchTerm) {
                const rowText = Object.values(row).join(' ').toLowerCase();
                if (!rowText.includes(searchTerm)) return false;
            }

            // Apply individual filters
            if (paperFilter && row['Paper ID'] !== paperFilter) return false;
            if (yearFilter && row['Year'] !== yearFilter) return false;
            if (pubtypeFilter && row['Publication Type'] !== pubtypeFilter) return false;
            if (sourceFilter && row['Source'] !== sourceFilter) return false;
            if (motivationFilter && row['Motivation'] !== motivationFilter) return false;
            if (technologyFilter && row['Technology'] !== technologyFilter) return false;
            if (domainFilter && row['Domain'] !== domainFilter) return false;
            if (methodsFilter && row['Methods'] !== methodsFilter) return false;
            if (targetgroupsFilter && row['Target Groups'] !== targetgroupsFilter) return false;
            if (valuesFilter && row['Values'] !== valuesFilter) return false;
            if (futuredirectionFilter && row['Future Direction'] !== futuredirectionFilter) return false;

            return true;
        });

        this.updateTable();
    }

    updateTable() {
        // Update count
        const countSpan = document.querySelector('.paper-count');
        if (countSpan) {
            countSpan.textContent = `(${this.filteredData.length} of ${this.allPapersData.length} papers)`;
        }

        // Update table body
        const tbody = document.getElementById('table-body');
        if (tbody) {
            tbody.innerHTML = this.generateTableRows();
        }
    }

    clearFilters() {
        document.getElementById('search-all').value = '';
        document.getElementById('filter-paper').value = '';
        document.getElementById('filter-year').value = '';
        document.getElementById('filter-pubtype').value = '';
        document.getElementById('filter-source').value = '';
        document.getElementById('filter-motivation').value = '';
        document.getElementById('filter-technology').value = '';
        document.getElementById('filter-domain').value = '';
        document.getElementById('filter-methods').value = '';
        document.getElementById('filter-targetgroups').value = '';
        document.getElementById('filter-values').value = '';
        document.getElementById('filter-futuredirection').value = '';

        this.filteredData = [...this.allPapersData];
        this.updateTable();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.papersViewer = new PapersViewer();
});