# Example Usage

This document provides examples of how to use the Lorebook Generator.

## Example 1: Creating a Character Lorebook

### Source Text
```
Sarah Mitchell is a 32-year-old forensic scientist working at the Central City Crime Lab. 
She has expertise in DNA analysis and trace evidence. Sarah has auburn hair, hazel eyes, 
and stands at 5'7". She's known for her meticulous attention to detail and her ability 
to solve cold cases. She lives in an apartment in the downtown area with her cat, Sherlock.

Sarah's mentor is Dr. Robert Chen, the lab director who has been working in forensics 
for over 20 years. He trained Sarah when she first joined the lab five years ago.

The Central City Crime Lab is equipped with state-of-the-art forensic technology including 
DNA sequencers, mass spectrometers, and a comprehensive fingerprint database.
```

### Processing Instructions (Optional)
You can use the default prompt or customize it. The default prompt is designed to:
- Extract all key information without censorship
- Create structured entries for characters, locations, and concepts
- Generate appropriate trigger keys for each entry

### Expected AI-Generated Entries

The AI should generate entries like:

**Entry 1 - Sarah Mitchell**
- Keys: Sarah, Sarah Mitchell, forensic scientist
- Content: Sarah Mitchell is a 32-year-old forensic scientist at Central City Crime Lab. Expert in DNA analysis and trace evidence. Auburn hair, hazel eyes, 5'7". Known for meticulous attention to detail. Lives downtown with her cat Sherlock.

**Entry 2 - Dr. Robert Chen**
- Keys: Dr. Chen, Robert Chen, lab director
- Content: Dr. Robert Chen is the director of Central City Crime Lab with over 20 years of forensics experience. Mentored Sarah Mitchell when she joined five years ago.

**Entry 3 - Central City Crime Lab**
- Keys: Crime Lab, Central City Crime Lab, forensics lab
- Content: State-of-the-art forensic laboratory equipped with DNA sequencers, mass spectrometers, and comprehensive fingerprint database.

## Example 2: World Building Lore

### Source Text
```
The Kingdom of Valdoria is a mountainous realm known for its skilled blacksmiths and 
ancient dragon riders. The capital city, Ironpeak, sits atop the highest mountain in 
the range. Valdorian steel is renowned throughout the continent for its superior quality.

The Dragon Riders are an elite order that bonds with dragons from birth. Only those 
born during a lunar eclipse can become Dragon Riders. The current Dragon Lord is 
Kavith Stormwing, who rides a black dragon named Shadowfang.

Valdoria has been at peace with its neighbor, the Merchant Republic of Seaside, for 
over a century due to the Treaty of Twin Rivers.
```

### Expected Entries

**Entry 1 - Kingdom of Valdoria**
- Keys: Valdoria, Kingdom of Valdoria, Valdorian
- Content: Mountainous kingdom known for skilled blacksmiths and dragon riders. Capital city Ironpeak sits atop the highest mountain. Famous for superior quality Valdorian steel.

**Entry 2 - Dragon Riders**
- Keys: Dragon Riders, Dragon Lord, dragon rider
- Content: Elite order that bonds with dragons from birth. Only those born during lunar eclipse can join. Current leader is Dragon Lord Kavith Stormwing who rides Shadowfang, a black dragon.

## Tips for Best Results

1. **Structured Source Material**: Organize your source text with clear paragraphs
2. **Key Information**: Include names, descriptions, relationships, and key facts
3. **Consistent Names**: Use the same names/terms throughout for consistency
4. **Review and Edit**: Always review AI-generated entries and adjust as needed
5. **Appropriate Keys**: Ensure trigger keys are unique and relevant

## Manual Entry Example

Sometimes you want more control. Here's how to create a manual entry:

**Trigger Keys:** "magic system, mana, spellcasting"

**Entry Content:**
```
The magic system is based on mana, an energy that flows through all living things. 
Practitioners must train for years to sense and manipulate mana. Spells are cast 
by channeling mana through specific mental patterns called "constructs." Overuse 
of mana leads to exhaustion and can be dangerous.
```

## Testing with Different APIs

### OpenAI
- URL: `https://api.openai.com/v1`
- Models: `gpt-4`, `gpt-3.5-turbo`, `gpt-4-turbo`

### Local Models (LM Studio)
- URL: `http://localhost:1234/v1`
- Models: Whatever model you have loaded

### Oobabooga Text Generation WebUI
- URL: `http://localhost:5000/v1`
- API Key: Can be left empty or use any placeholder
- Models: Your loaded model name

## Troubleshooting

### API Returns Unexpected Format
If the AI doesn't return proper JSON:
1. Check the processing instructions
2. Try a different model
3. Simplify your source text
4. Manually add entries as needed

### Entries Too Long
If entries are too verbose:
- Modify the processing instructions to request "concise" entries
- Manually edit entries after generation
- Split complex entries into multiple smaller ones

### Missing Information
If the AI misses important details:
- Ensure the source text is well-structured
- Try highlighting key information
- Add missed entries manually
