const fs = require('fs');
const path = require('path');

const dataToAdd = {
    GB: {
        country: "United Kingdom",
        updates: {
            company_search: [
                { name: "Endole", url: "https://open.endole.co.uk" },
                { name: "Cylex UK", url: "https://www.cylex-uk.co.uk" },
                { name: "FreeIndex", url: "https://www.freeindex.co.uk" },
                { name: "192", url: "https://www.192.com" }
            ],
            b2b: [
                { name: "eSources", url: "https://www.esources.co.uk" },
                { name: "Europages UK", url: "https://www.europages.co.uk" }
            ],
            customs: [
                { name: "Fob AI", url: "https://fob.ai.cc" }
            ]
        }
    },
    US: {
        country: "United States",
        updates: {
            company_search: [
                { name: "Better Business Bureau", url: "https://www.bbb.org" }
            ],
            govt: [
                { name: "International Trade Administration", url: "https://www.trade.gov" }
            ]
        }
    },
    CA: {
        country: "Canada",
        updates: {
            company_search: [
                { name: "Fyple", url: "https://www.fyple.ca" },
                { name: "411.ca", url: "https://411.ca" }
            ]
        }
    },
    BR: {
        country: "Brazil",
        updates: {
            company_search: [
                { name: "Telelistas", url: "https://www.telelistas.net" }
            ],
            chamber: [
                { name: "Portal da Indústria", url: "https://www.portaldaindustria.com.br" }
            ]
        }
    },
    AR: {
        country: "Argentina",
        updates: {
            company_search: [
                { name: "Paginas Amarillas AR", url: "https://www.paginasamarillas.com.ar" }
            ]
        }
    },
    CO: {
        country: "Colombia",
        updates: {
            company_search: [
                { name: "Paginas Amarillas CO", url: "https://www.paginasamarillas.com.co" }
            ]
        }
    },
    SE: {
        country: "Sweden",
        updates: {
            company_search: [
                { name: "Hitta", url: "https://www.hitta.se" }
            ]
        }
    },
    DK: {
        country: "Denmark",
        updates: {
            company_search: [
                { name: "De Gule Sider", url: "https://www.degulesider.dk" }
            ]
        }
    },
    FI: {
        country: "Finland",
        updates: {
            company_search: [
                { name: "Finder", url: "https://www.finder.fi" }
            ]
        }
    },
    PL: {
        country: "Poland",
        updates: {
            company_search: [
                { name: "Panorama Firm", url: "https://www.panoramafirm.pl" }
            ]
        }
    },
    CZ: {
        country: "Czech Republic",
        updates: {
            company_search: [
                { name: "Firmy", url: "https://www.firmy.cz" },
                { name: "Zlate Stranky", url: "https://www.zlatestranky.cz" }
            ]
        }
    },
    AU: {
        country: "Australia",
        updates: {
            company_search: [
                { name: "Yellow Pages AU", url: "https://www.yellowpages.com.au" },
                { name: "White Pages AU", url: "https://www.whitepages.com.au" },
                { name: "TrueLocal", url: "https://www.truelocal.com.au" },
                { name: "HiPages", url: "https://www.hipages.com.au" },
                { name: "Word of Mouth", url: "https://www.wordofmouth.com.au" }
            ]
        }
    },
    DE: {
        country: "Germany",
        updates: {
            b2b: [
                { name: "ThermoFisher", url: "https://www.thermofisher.com" },
                { name: "WLW (Wer liefert was)", url: "https://www.wlw.de" }
            ],
            company_search: [
                { name: "Firmenwissen", url: "https://www.firmenwissen.com" }
            ]
        }
    },
    IN: {
        country: "India",
        updates: {
            company_search: [
                { name: "ZaubaCorp", url: "https://www.zaubacorp.com" }
            ]
        }
    },
    AE: {
        country: "United Arab Emirates",
        updates: {
            company_search: [
                { name: "Yello AE", url: "https://www.yello.ae" }
            ]
        }
    },
    RU: {
        country: "Russia",
        updates: {
            company_search: [
                { name: "Cataloxy", url: "https://www.cataloxy.ru" }
            ]
        }
    },
    CH: {
        country: "Switzerland",
        updates: {
            company_search: [
                { name: "Local CH", url: "https://www.local.ch/en" }
            ]
        }
    }
};

const targetFile = path.join(__dirname, 'yellowPagesData.ts');
let content = fs.readFileSync(targetFile, 'utf8');

for (const [code, info] of Object.entries(dataToAdd)) {
    const countryPattern = new RegExp(`\\b${code}:\\s*\\{[\\s\\S]*?country:\\s*(['"])${info.country}\\1,\\s*categories:\\s*\\{`, 'i');
    const match = content.match(countryPattern);

    if (match) {
        // Country exists
        let countryBlockStartIndex = match.index + match[0].length;
        let braceCount = 1;
        let i = countryBlockStartIndex;
        while (braceCount > 0 && i < content.length) {
            if (content[i] === '{') braceCount++;
            else if (content[i] === '}') braceCount--;
            i++;
        }
        let countryBlockEndIndex = i - 1; // before the closing brace of categories

        let countryBlock = content.substring(countryBlockStartIndex, countryBlockEndIndex);

        for (const [catName, links] of Object.entries(info.updates)) {
            const catRegex = new RegExp(`(${catName}:\\s*\\[)([\\s\\S]*?)(\\])`, 'i');
            if (catRegex.test(countryBlock)) {
                // Category exists, append links
                countryBlock = countryBlock.replace(catRegex, (match, prefix, items, suffix) => {
                    let extra = '';
                    links.forEach(link => {
                        if (!items.includes(link.url)) {
                            if (items.trim() !== '' && !items.trim().endsWith(',')) {
                                extra += ', ';
                            }
                            extra += `\n        { name: "${link.name}", url: "${link.url}" },`;
                        }
                    });
                    return prefix + items + extra + '\n      ' + suffix;
                });
            } else {
                // Category doesn't exist, append it at the end
                let extra = `\n      ${catName}: [\n`;
                extra += links.map(link => `        { name: "${link.name}", url: "${link.url}" }`).join(',\n');
                extra += `\n      ],`;

                countryBlock = countryBlock.trimRight();
                if (countryBlock.endsWith(',')) {
                    countryBlock += extra;
                } else {
                    countryBlock += ',' + extra;
                }
            }
        }
        content = content.substring(0, countryBlockStartIndex) + countryBlock + content.substring(countryBlockEndIndex);

    } else {
        // Country doesn't exist, we must add it before the last `};`
        let newBlock = `  ${code}: {\n    country: "${info.country}",\n    categories: {\n`;
        for (const [catName, links] of Object.entries(info.updates)) {
            newBlock += `      ${catName}: [\n`;
            newBlock += links.map(link => `        { name: "${link.name}", url: "${link.url}" }`).join(',\n');
            newBlock += `\n      ],\n`;
        }
        newBlock += `    }\n  },\n`;

        const endOfExportIndex = content.indexOf('};\n\n// 获取某国的黄页数据');
        content = content.substring(0, endOfExportIndex) + newBlock + content.substring(endOfExportIndex);
    }
}

fs.writeFileSync(targetFile, content);
console.log('Successfully updated yellowPagesData.ts');
