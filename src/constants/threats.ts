export const threatDatabase = [
  {
    id: 'LLM01',
    title: 'Prompt Injection',
    description:
      'Vulnerability when an attacker manipulates the LLM through crafted inputs, leading to data exfiltration or other issues.',
    mitigation: [
      'Enforce privilege control on LLM access',
      'Add human approval for critical operations',
      'Segregate external content'
    ],
    components: ['EPS'],
    referenceURL: 'https://www.mitre.org/example-prompt-injection'
  },
  {
    id: 'LLM02',
    title: 'Insecure Output Handling',
    description:
      'Risks associated with insufficient validation of LLM-generated outputs, leading to potential security breaches.',
    mitigation: [
      'Implement input validation and sanitization',
      'Follow OWASP ASVS guidelines for output encoding'
    ],
    components: ['LLM'],
    referenceURL: 'https://owasp.org/www-project-application-security-verification-standard/'
  },
  {
    id: 'LLM03',
    title: 'Training Data Poisoning',
    description:
      "Manipulation of training data to introduce vulnerabilities or biases in the LLM's outputs.",
    mitigation: [
      'Verify training data sources',
      'Apply data sanitization',
      'Use adversarial robustness techniques'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/example-training-data-poisoning'
  },
  {
    id: 'LLM04',
    title: 'Model Denial of Service',
    description:
      'Attackers may target SSF with resource-intensive tasks or malformed inputs, aiming to degrade performance or availability.',
    mitigation: ['Implement rate limiting', 'Input validation', 'Resource usage monitoring'],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/example-model-dos'
  },
  {
    id: 'LLM05',
    title: 'Supply Chain Vulnerabilities',
    description: 'Risks in LLM supply chain impacting training data and models.',
    mitigation: [
      'Vet data sources and suppliers',
      'Use reputable plugins',
      'Apply OWASP guidelines for vulnerable components'
    ],
    components: ['EPS', 'LLM'],
    referenceURL: 'https://www.owasp.org/index.php/Supply_Chain_Security'
  },
  {
    id: 'LLM06',
    title: 'Sensitive Information Disclosure',
    description:
      'Potential disclosure of sensitive or confidential information through LLM outputs.',
    mitigation: [
      'Data sanitization',
      'Robust input validation',
      'Strict access control to external data sources'
    ],
    components: ['EPS', 'LLM', 'PDS'],
    referenceURL: 'https://atlas.mitre.org/example-sensitive-info-disclosure'
  },
  {
    id: 'LLM07',
    title: 'Insecure Plugin Design',
    description:
      'Plugins or integrations used by SSF may have vulnerabilities that can be exploited.',
    mitigation: [
      'Conduct thorough security reviews of third-party plugins',
      'Ensure secure configuration',
      'Apply regular updates and patches'
    ],
    components: ['SSF'],
    referenceURL: 'https://owasp.org/www-project-application-security-verification-standard/'
  },
  {
    id: 'LLM08',
    title: 'Excessive Agency',
    description:
      'LLM-based systems performing damaging actions due to excessive permissions or functionality.',
    mitigation: [
      'Limit functions and permissions',
      'Implement human-in-the-loop control',
      'Apply strict authorization in downstream systems'
    ],
    components: ['LLM', 'SSF'],
    referenceURL: 'https://www.mitre.org/example-excessive-agency'
  },
  {
    id: 'LLM09',
    title: 'Overreliance',
    description: 'Relying too much on LLM outputs, leading to misinformation or security breaches.',
    mitigation: [
      'Monitor and review LLM outputs',
      'Cross-check with trusted sources',
      'Implement automatic validation mechanisms'
    ],
    components: ['EPS', 'LLM'],
    referenceURL: 'https://atlas.mitre.org/example-overreliance'
  },
  {
    id: 'LLM10',
    title: 'Model Theft',
    description: 'Unauthorized access and exfiltration of LLM models.',
    mitigation: [
      'Enforce strong access controls',
      'Regular monitoring',
      'Implement adversarial robustness training'
    ],
    components: ['LLM', 'PDS'],
    referenceURL: 'https://atlas.mitre.org/example-model-theft'
  },
  {
    id: 'AML.T0008',
    title: 'Acquire Infrastructure',
    description:
      'Adversaries may acquire infrastructure like cloud servers or third-party web services for their operations, blending in with normal traffic.',
    mitigation: [
      'Secure and monitor the infrastructure used by SSF',
      'Regularly update and patch systems'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0008/'
  },
  {
    id: 'AML.T0016.000',
    title: 'Adversarial ML Attack Implementations',
    description:
      'Adversaries may search for open source ML attack tools, weaponizing them against the system.',
    mitigation: [
      'Implement and update security measures to protect against known attack tools',
      'Monitor for unusual activities'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0016/'
  },
  {
    id: 'AML.T0018',
    title: 'Backdoor ML Model',
    description:
      'Attackers may insert backdoors into ML models, which get triggered by specific inputs.',
    mitigation: [
      'Strictly control and monitor model training and deployment processes',
      'Implement checks for backdoor triggers'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0018/'
  },
  {
    id: 'AML.T0043.001',
    title: 'Black-Box Optimization',
    description:
      'Adversaries with limited knowledge (black-box access) about the target model may launch less effective attacks requiring more queries.',
    mitigation: [
      'Apply query restrictions',
      'Implement input validation and adversarial input detection'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0043.001/'
  },
  {
    id: 'AML.T0043.002',
    title: 'Black-Box Transfer',
    description:
      'Attackers might use proxy models to create adversarial examples that are effective against the target model.',
    mitigation: [
      'Ensure models are robust against transfer attacks',
      'Possibly use ensemble methods'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0043.002/'
  },
  {
    id: 'AML.T0034',
    title: 'Cost Harvesting',
    description: 'Malicious queries or inputs can be used to increase operational costs.',
    mitigation: ['Implement rate limiting', 'Monitor for resource-intensive or abnormal queries'],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0034/'
  },
  {
    id: 'AML.T0043',
    title: 'Craft Adversarial Data',
    description: 'Adversarial inputs can cause misclassification or other undesired outcomes.',
    mitigation: [
      'Harden models against adversarial inputs',
      'Use input restoration',
      'Apply ensemble methods'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0043/'
  },
  {
    id: 'AML.T0015',
    title: 'Evade ML Model',
    description: 'Crafted inputs to evade ML model detection in security applications.',
    mitigation: [
      'Harden models to improve detection capabilities',
      'Use multiple detection methods (multi-modal sensors)'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0015/'
  },
  {
    id: 'AML.T0024',
    title: 'Exfiltration via ML Inference API',
    description: 'Sensitive data can be exfiltrated via ML model inference APIs.',
    mitigation: ['Restrict the number of queries', 'Obfuscate ML outputs', 'Monitor API usage'],
    components: ['PDS'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0024/'
  },
  {
    id: 'AML.T0017',
    title: 'Develop Capabilities',
    description:
      'Attackers may develop custom capabilities like websites with adversarial information or obfuscated code.',
    mitigation: [
      'Ensure robust security practices',
      'Conduct regular audits to prevent exploitation of developed capabilities'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0017/'
  },
  {
    id: 'AML.T0007',
    title: 'Discover ML Artifacts',
    description: 'Attackers may search for ML artifacts on the system for further exploitation.',
    mitigation: ['Encrypt sensitive ML artifacts', 'Control and monitor access to these artifacts'],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0007/'
  },
  {
    id: 'AML.T0044',
    title: 'Full ML Model Access',
    description: 'Gaining complete knowledge of the model for crafting effective attacks.',
    mitigation: [
      'Control and monitor access to the model',
      'Consider cloud-based model serving to limit direct access'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0044/'
  },
  {
    id: 'AML.T0014',
    title: 'Discover ML Model Family',
    description: 'Identifying the model family can help in tailoring attacks.',
    mitigation: [
      'Obfuscate model details',
      'Limit the information disclosed through model outputs'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0014/'
  },
  {
    id: 'AML.T0013',
    title: 'Discover ML Model Ontology',
    description: "Learning about the model's ontology helps in crafting targeted attacks.",
    mitigation: ['Limit exposure of model ontology through API responses and documentation'],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0013/'
  },
  {
    id: 'AML.T0031',
    title: 'Erode ML Model Integrity',
    description: 'Degrade model performance over time with adversarial data inputs.',
    mitigation: [
      'Apply model hardening techniques',
      'Regular monitoring to maintain model integrity'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0031/'
  },
  {
    id: 'AML.T0024.002',
    title: 'Extract ML Model',
    description: 'Extracting a copy of the model for unauthorized use.',
    mitigation: [
      'Apply obfuscation to ML outputs',
      'Restrict the rate of queries to prevent model extraction'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0024.002/'
  },
  {
    id: 'AML.T0027',
    title: 'Infer Training Data',
    description: 'Identifying training data through inference attacks.',
    mitigation: [
      'Minimize sensitive data in training sets',
      'Apply differential privacy techniques'
    ],
    components: ['SSF'],
    referenceURL: 'https://atlas.mitre.org/techniques/AML.T0027/'
  }
]
