# Natural Language Processing for Moroccan Darija

Moroccan Darija (Moroccan Arabic) presents unique challenges for NLP systems. This article explores our research into building effective language models for this understudied dialect.

## The Challenge

Darija differs significantly from Modern Standard Arabic (MSA) in:

- **Vocabulary**: Heavy French, Berber, and Spanish influences
- **Syntax**: Simplified grammatical structures
- **Writing**: Inconsistent Romanization and orthography
- **Resources**: Limited labeled datasets and corpora

## Our Approach

### Data Collection

We built a diverse corpus from:

1. Social media conversations
2. Moroccan news websites
3. YouTube transcripts
4. Community forums

Total dataset: **2.5M sentences** across multiple domains.

### Preprocessing Pipeline

```python
def preprocess_darija(text):
    # Normalize Arabic characters
    text = normalize_arabic(text)
    
    # Handle code-switching (Arabic/French/English)
    text = detect_and_tag_languages(text)
    
    # Normalize Romanization
    text = normalize_romanization(text)
    
    return text
```

## Model Architecture

We experimented with several architectures:

### 1. Transformer-based Models

Fine-tuned AraBERT and mBERT on our Darija corpus:

| Model | F1 Score | Training Time |
|-------|----------|---------------|
| AraBERT | 0.82 | 12h |
| mBERT | 0.79 | 15h |
| Custom | 0.85 | 18h |

### 2. Handling Code-Switching

Darija speakers frequently switch between Arabic, French, and English:

```
"أنا غادي نمشي l école بكري"
(I'm going to school early)
```

We developed a multi-script encoder that processes each language segment appropriately.

## Key Findings

### 1. Romanization Hurts Performance

Models trained on Arabic script outperformed Romanized versions by **12%**.

### 2. Dialectal Variation

Significant differences between:
- Northern Darija (Tangier, Tetouan)
- Central Darija (Casablanca, Rabat)
- Southern Darija (Marrakech, Agadir)

### 3. Domain Adaptation

Models need fine-tuning for specific domains:
- Social media: Informal, emoji-rich
- News: Formal, MSA-influenced
- Conversational: Code-switching heavy

## Applications

Our models enable:

- **Sentiment Analysis**: Understanding Moroccan social media
- **Machine Translation**: Darija ↔ English/French
- **Speech Recognition**: Voice assistants for Moroccan users
- **Content Moderation**: Detecting harmful content

## Open Source Contribution

We're releasing:

- **DarijaCorpus**: 2.5M sentences
- **DarijaBERT**: Pre-trained language model
- **Evaluation Benchmarks**: Standard test sets

Access at: [github.com/Master-IASD-2025/darija-nlp](https://github.com/Master-IASD-2025/darija-nlp)

## Future Work

- **Low-resource dialects**: Extend to Amazigh languages
- **Multimodal models**: Combine text with audio
- **Real-time systems**: Deploy for production use
- **Community engagement**: Crowdsource more data

## Conclusion

NLP for Darija requires specialized approaches that account for linguistic complexity and code-switching. Our models show promising results, but there's much work ahead.

We invite the community to collaborate on this important research area.

---

*For questions or collaboration, reach out to our research team.*
