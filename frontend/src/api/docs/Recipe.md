# Recipe


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**instructions** | **string** |  | [optional] [default to undefined]
**cookingTime** | **number** |  | [optional] [default to undefined]
**difficulty** | **string** |  | [optional] [default to undefined]
**categories** | **Set&lt;string&gt;** |  | [optional] [default to undefined]
**ingredients** | [**Array&lt;RecipeIngredient&gt;**](RecipeIngredient.md) |  | [optional] [default to undefined]
**directCategories** | **Set&lt;string&gt;** |  | [optional] [default to undefined]

## Example

```typescript
import { Recipe } from './api';

const instance: Recipe = {
    id,
    name,
    instructions,
    cookingTime,
    difficulty,
    categories,
    ingredients,
    directCategories,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
